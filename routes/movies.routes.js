const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find({});
    res.render("movies/new-movie", { celebrities });
  } catch (err) {
    console.log("err", err);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.redirect("/movies");
  } catch (err) {
    res.render("/movies/create");
    console.log("err", err);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.render("movies/movies", { movies });
  } catch (err) {
    console.log("err", err);
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const movieDetails = await Movie.findById(req.params.id).populate("cast");
    console.log(movieDetails)
    res.render("movies/movie-details",movieDetails);
  } catch (err) {
    console.log("err", err);
  }
});

module.exports = router;
