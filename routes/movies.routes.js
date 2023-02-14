// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// Create a Movie
router.get("/movies/create", async (req, res, next) => {
  try {
    let celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });

    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    /*  res.render("movies/new-movie"); */
    next(error);
  }
});

// Show all Movies
router.get("/movies", async (req, res, next) => {
  try {
    let movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Get Details
router.get("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");

    const celebrities = await Celebrity.find();
    res.render("movies/movie-details", { movie, celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Delete the movie
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

// Edit the movie

//Edit form
router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id); /* .populate("cast"); */
    const celebrities = await Celebrity.find();

    res.render("movies/edit-movie", { movie, celebrities });
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

    res.redirect(`/movies/${id}/edit`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
