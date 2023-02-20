// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

// render create new movie form

router.get("/create-movie/", (req, res, next) => {
  Celebrity.find().then((allCeleb) => {
    res.render("movies/new-movie", { allCeleb });
  });
});

// create new movie

router.post("/create-movie", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => next(error));
});

// List all movies

router.get("/movies/", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((allMovies) => {
      res.render("../views/movies/movies.hbs", { movie: allMovies });
    });
});

router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) =>
      res.render("../views/movies/movie-details.hbs", { movie: foundMovie })
    )
    .catch((error) => next(error));
});

// Delete a movie from the database

router.post("/movies/:movieId/delete", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect("/movies"))
    .catch((error) => next(error));
});

module.exports = router;
