// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movies = require("../models/Movies.model");
const Celeb = require("../models/Celebrity.model");

router.get("/Movies", (req, res, next) => {
  Movies.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
});

router.get("/movies/create", (req, res, next) => {
  Celeb.find()
    .then((celebs) => {
      res.render("movies/new-movie", { celebs });
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movies.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movies.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", movie);
    })
    .catch((err) => next(err));
});

module.exports = router;
