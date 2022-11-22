const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    console.log(allCelebrities);
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const newMovie = await Movie.create({ title, genre, plot, cast });
    console.log("New movie created:", newMovie);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate("cast");
    res.render("movies/movie-details", movie);
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:movieId/delete", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    await Movie.findByIdAndDelete(movieId);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:movieId/edit", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movie = await Movie.findById(movieId);
    const allCelebrities = await Celebrity.find();
    res.render("movies/edit-movie", { movie, allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:movieId/edit", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const { title, genre, plot, cast } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect(`/movies/${movieId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
