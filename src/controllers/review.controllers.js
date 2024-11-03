const Review = require("../models/review.models.js");
const asyncHandler = require("express-async-handler");

const addReview = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized, no user logged in");
  }
  const { rating, comment } = req.body;
  const userId = req.user.id;
  const movieId = req.params.movieId;
  try {
    const review = await Review.create({
      movie: movieId,
      user: userId,
      rating,
      comment,
    });
    res.status(200).json(review);
  } catch (err) {
    res.status(500);
    throw new Error("Couldnt Add the review");
  }
});

const getReviews = asyncHandler(async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const reviews = await Review.find({ movie: movieId });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(404);
    throw new Error("No Reviews");
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized, no user logged in");
  }
  const reviewId = req.params.reviewId;
  try {
    const review = await Review.findByIdAndDelete(reviewId);

    res.status(200).json(review);
  } catch (err) {
    res.status(500);
    throw new Error("Could delete the review");
  }
});

module.exports = { addReview, getReviews, deleteReview };
