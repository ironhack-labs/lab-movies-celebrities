const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
require("../db");

router.get("/movies/create", async (req, res) => {
  const allCelebrities = await Celebrity.find();
  res.render("movies/new-movies", { allCelebrities });
});

router.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { allMovies });
  } catch (err) {
    console.log(err);
  }
});

router.post("/movies/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
  }
});

//creating a movie details route

router.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate({
      path: "cast",
      select: "-_id name occupation catchPhrase",
    })
    .then((movie) => res.render("movies/movie-detail", movie))
    .catch((err) => console.error(err));
});

module.exports = router;
