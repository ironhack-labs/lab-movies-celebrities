const route = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrities = require("../models/Celebrity.model");
const { findByIdAndUpdate } = require("../models/Movie.model");

route.get("/create", async (req, res, next) => {
  let celebrities = await Celebrities.find();
  res.render("movies/new-movie", { celebrities });
});

route.post("/create", async (req, res, next) => {
  const { title, genre, plot, celebrity } = req.body;
  await Movie.create({ title, genre, plot, cast: celebrity });
});

route.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().populate("cast");
    res.render("movies/movies", { allMovies });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details", movie);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

route.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

route.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    console.log(movie);
    res.render("movies/edit-movie", movie);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

route.post("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(id, {
      title,
      genre,
      plot,
      cast,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = route;
