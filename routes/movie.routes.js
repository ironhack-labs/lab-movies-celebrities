// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().populate("cast");
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  // destructuration on an object
  try {
    const { title, genre, plot, cast } = req.body;

    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies")
  } catch (error) {
    next(error)
  }
});

module.exports = router;
