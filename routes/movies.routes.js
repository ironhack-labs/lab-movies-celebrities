const router = require("express").Router();
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/movies", (req, res, next) => {
  res.render("movies");
});

router.post("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("/movies", { movies });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
