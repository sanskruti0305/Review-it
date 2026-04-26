// routes/reviewRoutes.js
// ─────────────────────────────────────────────────────────────────
// Defines the API endpoints and maps them to controller functions.
// The router is like a traffic director — it doesn't do any work,
// it just hands the request to the right controller function.
// ─────────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  getReviews,
  getAnalytics,
  createReview,
} = require("../controllers/reviewController");

// ── Route Definitions ─────────────────────────────────────────────
//   Method   Path                   Controller Function
// ─────────────────────────────────────────────────────────────────
router.get("/analytics", getAnalytics);  // GET  /api/reviews/analytics
router.get("/",          getReviews);    // GET  /api/reviews
router.post("/",         createReview);  // POST /api/reviews

// Note: /analytics must be defined BEFORE "/" to avoid Express
// matching "analytics" as a dynamic :id param if we had one.

module.exports = router;
