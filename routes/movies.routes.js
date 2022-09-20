const router = require("express").Router();
// const { Router } = require("express");
const { Movie } = require("../models/Movie.model");
const { Celebrity } = require("../models/Celebrity.model");

// all your routes here
router.get("/movies", async (req, res) => {
  const allMovies = await Movie.find();
  console.log(allMovies);
  res.render("movies/movies", { movies: allMovies });
});

router.get("/movies/create", async (req, res) => {
  const allCelebrities = await Celebrity.find();
  res.render("movies/new-movie", { celebrities: allCelebrities });
});

router.post("/movies/create", async (req, res) => {
  try {
    const newMovie = new Movie({ ...req.body });
    console.log(newMovie);
    await newMovie.save();
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
    res.render("error");
  }
});

module.exports = router;

// router.get("/celebrities/create", (req, res) => {
//   res.render("celebrities/new-celebrity");
// });

// router.post("/movies/create", async (req, res) => {
//   try {
//     const newMovie = new Movie({ ...req.body });
//     await newMovie.save();
//     res.redirect("/movies");
//   } catch (err) {
//     res.render("movies/new-movie");
//   }
// });
