const router = require("express").Router();
const MovieModel = require("../models/movie.model");

router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

router.get("/all", (req, res) => {
  res.render("movies/movies");
});

router.get("/movie-details", (req, res) => {
  res.render("movies/movie-details");
});

router.post("/create", async (req, res) => {
  try {
    const newMovie = await MovieModel.create(req.body);
    console.log("New Movie Created ", newMovie);
    res.redirect("/movies");
  } catch (err) {
    console.log("there was an error", err);
    res.redirect("/new-movie");
  }
});

module.exports = router;
