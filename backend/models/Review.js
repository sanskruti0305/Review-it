// models/Review.js
// ─────────────────────────────────────────────────────────────────
// Defines the shape (schema) of a Review document in MongoDB.
// Mongoose will enforce these rules before saving any data.
// ─────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // The name of the book or movie being reviewed
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },

    // Which category this review belongs to
    category: {
      type: String,
      enum: {
        values: ["Book", "Movie"],
        message: "Category must be either 'Book' or 'Movie'",
      },
      required: [true, "Category is required"],
    },

    // The reviewer's star rating (1 to 5)
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    // The micro-review text — kept short intentionally
    reviewText: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      maxlength: [300, "Keep it under 300 characters — this is a micro-review!"],
    },

    // Optional: reviewer's display name
    name: {
      type: String,
      trim: true,
      default: "Anonymous",
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
  },
  {
    // Mongoose automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// Export the model so controllers can use it to query MongoDB
module.exports = mongoose.model("Review", reviewSchema);
