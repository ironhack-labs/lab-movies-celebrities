//make a reference between function Router from express to our local variable router

const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// handle routes to movies here

router.get("/", async (req, res, next) => {
  const allMovies = await Movie.find();
  res.render("movies/movies", { allMovies });
});

router.get("/create", async (req, res, next) => {
  const allCelebs = await Celebrity.find();

  res.render("movies/new-movie", { allCelebs });
});

router.post("/create", async (req, res, next) => {
  console.log(req.body);
  try {
    const newMovie = req.body;
    await Movie.create(newMovie);
  } catch (error) {}
  res.redirect("/movies");
});

//exports
module.exports = router;
