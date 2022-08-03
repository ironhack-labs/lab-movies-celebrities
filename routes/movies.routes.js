const Movies = require("../models/Movies.model");

const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

const mongoose = require("mongoose");

// all your routes here

// interaction 6

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebs) => {
      res.render("movies/new-movie", { allCelebs });
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movies.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      console.log(`${createdMovie.title} was created`);
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

// interaction 7

router.get("/movies", (req, res, next) => {
  Movies.find()
    .populate("cast")
    .then((allMovies) => res.render("movies/movies", { allMovies }))
    .catch((err) => {
      console.log("Movie not found");
    });
});

module.exports = router;
