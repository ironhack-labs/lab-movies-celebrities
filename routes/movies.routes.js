const express = require("express");
const moviesRouter = new express.Router();
const MovieModel = require("./../models/movie.model");
const CelebrityModel = require("./../models/celebrity.model");


// Show a form to CREATE a movie
moviesRouter.get("/new", async (req, res, next) => {
  try {
    const celebrities = await CelebrityModel.find();
    const movies = await MovieModel.find();
    res.render("movies/new-movie", { celebrities, movies });
  } catch(err) {
    next(err);
  }
});


moviesRouter.post("/create", async (req, res, next) => {
  const newMovie = { ...req.body };
  console.log(newMovie);
  try {
    await MovieModel.create(newMovie);
    res.redirect("./movies");
  } catch (err) {
    res.render("movies/new-movie")
    next(err);
  }
});

// Get all movies
moviesRouter.get("/movies", async (req, res, next) => {
  try {
    res.render("movies/movies", { movies: await MovieModel.find() });
  } catch (err) {
    next(err);
  }
});

// Get one movie's details
moviesRouter.get("/:id", async (req, res, next) => {
  try {
    const movie = await MovieModel.findById(req.params.id).populate("cast");
    console.log(movie);
    res.render("movies/movie-details", movie);
  } catch (err) {
    next(err);
  }
});


module.exports = moviesRouter;