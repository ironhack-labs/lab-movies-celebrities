const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// router.get("/new-movie", (req, res, next) => res.render("movies/new-movie"));

router.post("/movies/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    const createdMovie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.render("movies/new-movie");
  }
});

// get all celebrities to movies
router.get("/movies/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//display movies
router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Display movies by ID
router.get("/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", {movie});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies", (req, res, next) => res.render("movies/movies"));

module.exports = router;
