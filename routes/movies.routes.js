// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const express = require("express");

const Movies = require("../models/Movies.model");

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1/lab-movies-celebrities" ||
  "mongodb://localhost:27017/lab-movies-celebrities";

// all your routes here
//GET movies create form
router.get("/movies", (req, res, next) => {
  Celebrity.find()
    .then(() => {
      res.render("movies/new-movie");
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
    cast: req.body.cast, //potentially wrong
  };

  Movies.create(moviesDetails)
    .then((moviesDetails) => {
      res.redirect("movies/movies");
    })
    .catch((err) => {
      res.render("movies/new-movie");
      next();
    });
});

module.exports = router;

// GET view all movies
router.get("/movies", (req, res, next) => {
  Movies.find()
    .then(() => {
      res.render("movies/movies");
    })
    .catch((err) => {
      console.log("Error deleting book...", err);
      next();
    });
});
