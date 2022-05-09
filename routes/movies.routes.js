// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");

// all your routes here

// retrieve movie data
router.get("/", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movies = Movie.findById(id);
    res.render("movies/movies");
  } catch (error) {
    next(error);
  }
});

// movie details
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDetails = await Movie.findById(id);
    res.render("movies/movie-details", movieDetails);
  } catch (error) {
    next(error);
  }
});

// edit movies (get/post)
router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const editMovie = await Movie.findById(id);
    const editCelebrities = await Celebrity.find();
    res.render("/movies/edit-movie", { editMovie, editCelebrities });
  } catch (error) {
    next(error);
  }
});

// delete movie
router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndRemove();
    res.redirect("movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
