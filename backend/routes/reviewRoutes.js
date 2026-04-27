const express = require("express");
const router  = express.Router();
const {
  getReviews,
  getAnalytics,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.get("/analytics",  getAnalytics);   // GET  /api/reviews/analytics
router.get("/",           getReviews);     // GET  /api/reviews
router.post("/",          createReview);   // POST /api/reviews
router.put("/:id",        updateReview);   // PUT  /api/reviews/:id
router.delete("/:id",     deleteReview);   // DELETE /api/reviews/:id

module.exports = router;