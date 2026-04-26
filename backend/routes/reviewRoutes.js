const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  getReviews,
  getAnalytics,
  createReview,
} = require("../controllers/reviewController");

router.get("/analytics", getAnalytics);  // GET  /api/reviews/analytics
router.get("/",          getReviews);    // GET  /api/reviews
router.post("/",         createReview);  // POST /api/reviews

module.exports = router;
