const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesDB) => {
      res.render("movies/movies", { moviesDB });
    })
    .catch((err) => next(err));
});

router.get("/movies/create", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/new-movie", { movies });
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId).then((movie) => {
    Celebrity.find().then((celebrity) => {
      res.render("movies/edit-movie", { movie, celebrity });
    });
  });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then((updatedMovie) => res.redirect("/movies/movie-details"))
    .catch((err) => next(err));
});

router.get("movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/edit-movie", { movie });
    })
    .catch((err) => next(err));
});

router.post("/movies/:id/delete", (res, req, next) => {
  const movieId = req.params.id;
  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

module.exports = router;
