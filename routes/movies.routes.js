// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
// const express = require("express");

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1/lab-movies-celebrities" ||
  "mongodb://localhost:27017/lab-movies-celebrities";

//GET movies create form
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebsFromDB) => {
      res.render("movies/new-movie", { celebrities: celebsFromDB });
    })
    .catch((err) => {
      console.log("Error getting movies from database...", err);
      next();
    });
});

//POST submit the celebrity create form
router.post("/movies/create", (req, res, next) => {
  const moviesDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(moviesDetails)
    .then((moviesDetails) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      res.redirect("/movies/create");
      next();
    });
});

module.exports = router;

// GET view all movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render("movies/movies", { movies: moviesFromDB });
    })
    .catch((err) => {
      console.log("Error deleting book...", err);
      next();
    });
});
