const Review = require("../models/Review");
const getReviews = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    // Build a dynamic MongoDB filter object based on query params
    const filter = {};

    if (search) {
      // $regex with $options:"i" = case-insensitive search
      filter.title = { $regex: search, $options: "i" };
    }

    if (category && ["Book", "Movie"].includes(category)) {
      filter.category = category;
    }

    // Determine sort order: by rating (desc) or by date (desc, default)
    const sortOrder = sort === "rating" ? { rating: -1 } : { createdAt: -1 };

    const reviews = await Review.find(filter).sort(sortOrder).populate("user", "name email");

    // Send the array of reviews as JSON with a 200 OK status
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
      error: error.message,
    });
  }
};


// Returns aggregate stats: total count, avg rating, per-category breakdown.
const getAnalytics = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();

    // MongoDB aggregation pipeline to compute averages per category
    const statsByCategory = await Review.aggregate([
      {
        $group: {
          _id: "$category",             // group by "Book" or "Movie"
          count: { $sum: 1 },           // count docs in each group
          avgRating: { $avg: "$rating" }, // average the rating field
        },
      },
    ]);

    // Overall average across all reviews
    const overallAvg = await Review.aggregate([
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);

    // Most recent 3 reviews for the analytics page preview
    const recent = await Review.find().sort({ createdAt: -1 }).limit(3);

    res.status(200).json({
      success: true,
      data: {
        totalReviews,
        overallAvgRating: overallAvg[0]?.avg?.toFixed(2) || 0,
        statsByCategory,
        recentReviews: recent,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while computing analytics",
      error: error.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const { title, category, rating, reviewText, name } = req.body;

    // Create a new Review instance using the Mongoose Model
    const review = new Review({ title, category, rating, reviewText, name,user: req.user.id});

    // .save() triggers Mongoose validation, then writes to MongoDB
    const savedReview = await review.save();

    // 201 = "Resource Created" — the standard HTTP status for POST success
    res.status(201).json({
      success: true,
      message: "Review posted successfully!",
      data: savedReview,
    });
  } catch (error) {
    // Mongoose validation errors have a specific structure
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({
      success: false,
      message: "Server error while saving review",
      error: error.message,
    });
  }
};
const updateReview = async (req, res) => {
  try {
    const { title, category, rating, reviewText, name } = req.body;
    const review = await Review.findById(req.params.id);
     if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { title, category, rating, reviewText, name },
      { new: true, runValidators: true }
    );
   res.status(200).json({
      success: true,
      data: updatedReview,
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
     const review = await Review.findById(req.params.id);
 if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
     if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }
 await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
      } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
   

module.exports = { getReviews, getAnalytics, createReview ,updateReview, deleteReview };
