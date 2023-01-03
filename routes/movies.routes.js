// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

// Create a route for adding new movies--- part a: display the form

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      console.log(celebritiesFromDb);

      res.render("movies/new-movie", { celebritiesFromDb });
    })
    .catch((err) => {
      console.log("error getting details from the db", err);
      next(err);
    });
});
// Create: part b : process the form and save the movie to db

router.post("/movies/create", (req, res, next) => {
  const movieDetail = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.create(movieDetail)
    .then((movieDetails) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("err creating new book to the db", err);
      next();
    });
});

/* display Movies from database  */
router.get("/movies", (req, res, next) => {
  Movie.find()

    .then((moviesFromDb) => {
      res.render("movies/movies", { movies: moviesFromDb });
    })
    .catch((err) => {
      console.log("error getting details from the db", err);
      next();
    });
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((moviesDetails) => {
    console.log(moviesDetails);
      res.render("movies/movie-details", { movies: moviesDetails });
    })
    .catch((err) => {
      console.log("error getting details from the db", err);
      next();
    });
});

module.exports = router;
