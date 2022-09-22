const express = require("express");
const router = express.Router();

const { Movie } = require("../models/Movie.model");
const { Celeb } = require("../models/Celebrity.model");

router.get("/movies/create", async (req, res) => {
  try {
    const celebs = await Celeb.find({}, { name: 1 });
    res.render("movies/new-movie", { celebs });
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

router.post("/movies/create", async (req, res) => {
  try {
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.redirect("/movies/movies");
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

router.get("/movies/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const viewTitle = await Movie.findById(req.params.id);
    await viewTitle.populate("cast");
    res.render("movies/movie-details", { viewTitle });
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

router.get("/movies/:id/edit", async (req, res) => {
  try {
    const editTitle = await Movie.findById(req.params.id);
    const celebs = await Celeb.findById(editTitle.cast);
    const celebName = celebs.name;
    res.render("movies/edit-movie", { editTitle, celebName });
    //this isn't rendering in views correctly but i don't know why. i gave up after a few hours of trying to fix...
    console.log(celebName);
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

//this post is unfinshed as a result of the above
router.post("/movies/:id", async (req, res) => {
  try {
    const updatedMovie = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
    };
    console.log(req.body);
    await Movie.findByIdAndUpdate(req.body.id, updatedMovie);
    res.redirect("/movie/movie-details");
  } catch (error) {
    res.render("error");
    console.log(error);
  }
});

module.exports = router;
