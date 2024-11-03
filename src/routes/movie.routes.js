const express = require("express");
const protect = require("../middleware/auth.middleware.js");
const isAdmin = require("../middleware/isAdmin.middleware.js");

const {
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  createMovie,
} = require("../controllers/movie.controllers.js");
const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", protect, isAdmin, createMovie);
router.put("/:id", protect, isAdmin, updateMovie);
router.delete("/:id", protect, isAdmin, deleteMovie);

module.exports = router;
