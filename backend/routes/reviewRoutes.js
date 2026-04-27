const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getReviews,
  getMyReviews,
  getAnalytics,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.get("/analytics", getAnalytics);
router.get("/", getReviews);
router.get("/myreviews", authMiddleware, getMyReviews);


router.post("/", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;