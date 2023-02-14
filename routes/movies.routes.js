// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post("/movies/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    const movie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    });

    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;

/* const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.render('movies/movies', { movies });
});
*/
