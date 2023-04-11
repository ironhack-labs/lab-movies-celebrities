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
      select: "-_id", // Ask Josh or Rico about the Syntax
    })
    .then((movie) => res.render("movies/movie-detail", movie))
    .catch((err) => console.error(err));
});

//route for deleting movies
router.post("/movies/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndRemove(id);
    console.log(deletedMovie);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
  }
});

//route for editing movies
router.get("/movies/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const movieToUpdate = await Movie.findById(id);
    const celebrityToUpdate = await Celebrity.find();
    res.render("movies/edit-movie", { movieToUpdate, celebrityToUpdate });
  } catch (err) {
    console.log(err);
  }
});

router.post("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(id, { title, genre, plot, cast });
    res.redirect("/movies/movie-detail");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
