const Movie = require("../models/movies.models");
const asyncHandler = require("express-async-handler");
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});
  if (movies) {
    return res.status(200).json(movies);
  } else {
    res.status(404);
    throw new Error("No Movies Found");
  }
});

const getMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  if (movie) {
    return res.status(200).json(movie);
  } else {
    res.status(404);
    throw new Error("No Movie Found");
  }
});
const updateMovie = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized, no user logged in");
  }
  if (req.user.role !== "ADMIN") {
    res.status(401);
    throw new Error("Unauthorized, you are not ADMIN");
  }
  const id = req.params.id;
  let movie = await Movie.findById(id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie Not Found");
  }
  try {
    movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500);
    throw new Error("Couldnt update the movie");
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized, no user logged in");
  }
  if (req.user.role !== "ADMIN") {
    res.status(401);
    throw new Error("Unauthorized, you are not ADMIN");
  }
  const id = req.params.id;
  let movie = await Movie.findById(id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie Not Found");
  }
  try {
    movie = await Movie.findByIdAndDelete(id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500);
    throw new Error("Couldnt update the movie");
  }
});

const createMovie = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized, no user logged in");
  }
  if (req.user.role !== "ADMIN") {
    res.status(401);
    throw new Error("Unauthorized, you are not ADMIN");
  }
  const { title, genre, releaseYear, description, averageRating } = req.body;
  try {
    const movie = await Movie.create({
      title,
      genre,
      releaseYear,
      description,
      averageRating,
    });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500);
    throw new Error("Couldnt Add the movie");
  }
});

module.exports = { getMovies, getMovie, updateMovie, deleteMovie, createMovie };
