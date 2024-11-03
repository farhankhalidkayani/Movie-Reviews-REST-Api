const express = require("express");
const protect = require("../middleware/auth.middleware.js");

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/review.controllers.js");
const router = express.Router();

router.get("/:movieId/reviews", getReviews);
router.post("/:movieId/reviews", protect, addReview);
router.delete("/:movieId/reviews/:reviewId", protect, deleteReview);

module.exports = router;
