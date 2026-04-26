
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },

    category: {
      type: String,
      enum: {
        values: ["Book", "Movie"],
        message: "Category must be either 'Book' or 'Movie'",
      },
      required: [true, "Category is required"],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    reviewText: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      maxlength: [300, "Keep it under 300 characters — this is a micro-review!"],
    },
    name: {
      type: String,
      trim: true,
      default: "Anonymous",
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Review", reviewSchema);
