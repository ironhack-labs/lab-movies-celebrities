const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", async (req, res) => {
  let celebrities = await Celebrity.find();
  res.render("movies/new-movie", { celebrities });
});

//CREATE MOVIE
router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;

    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    /* res.render("celebrities/new-celebrity", { celebrities }); */
    console.log(error);
    next(error);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    let movies = await Movie.find();

    res.render("movies/movies", { movies });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET MOVIE
router.get("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    //get a single movie by Id
    //Single populate
    const movie = await Movie.findById(id).populate("cast");

    console.log(movie);

    res.render("movies/movie-details", movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//DELETE MOVIE
router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;

    await Movie.findByIdAndDelete(id);

    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//EDIT MOVIE
router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    /* const celebrities = await Celebrity.findById(id); */
    /* console.log(celebrities); */
    res.render("movies/edit-movie", movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    await Movie.findByIdAndUpdate(id, { title, genre, plot, cast });

    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
