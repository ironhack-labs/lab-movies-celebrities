// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");

const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/movies/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
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
    next(error);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    let movie = await Movie.find();
    res.render("movies/movies", { movie });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details", movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
