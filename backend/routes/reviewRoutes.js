const express = require("express");
const router  = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getReviews,
  getAnalytics,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");



router.get("/analytics",  getAnalytics);   // GET  /api/reviews/analytics
router.get("/",           getReviews);     // GET  /api/reviews

router.post("/", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;