// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res, next) => {
  Movie.find().then((data) => {
    res.render("movies", { movies: data });
  });
});

router.get("/create", (req, res, next) => {
  Celebrity.find().then((data) => {
    res.render("new-movie", { celebrities: data });
  });
});

router.post("/create", (req, res, next) => {
  Movie.create(req.body)
    .then((data) => {
      res.redirect("/movies");
    })
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((data) => {
      res.render("movie-details", { movie: data });
    });
});

router.get("/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(res.redirect("/movies"))
    .catch((error) => console.log(error));
});

router.get("/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id).then((movie) => {
    Celebrity.find().then((celebrities) => {
      res.render("edit-movie", { celebrities: celebrities, movie: movie });
    });
  });
});

router.post("/:id/edit", (req, res, next) => {
  const movieID = req.params.id;
  const { title, genre, plot, cast } = req.body;

  const updatedMovie = {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  };

  Movie.findByIdAndUpdate(movieID, updatedMovie)
    .then(() => res.redirect(`/movies/${movieID}`))
    .catch((err) => {
      console.error("Error updating movie:", err);
      next(err);
    });
});

module.exports = router;
