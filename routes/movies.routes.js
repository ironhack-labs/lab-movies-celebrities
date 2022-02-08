const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebs = require("../models/Celebrity.model");

router.get("/movies", (req, res, next) => {
  Movie.find().then((movieArr) => {
    res.render("movies/movies", { movies: movieArr });
  });
});

router.get("/create", (req, res, next) => {
  Celebs.find()
    .then((celebArr) => {
      res.render("movies/new-movie", { celebs: celebArr });
    })
    .catch((err) => consolelog("Error finding celebs", err));
});

router.post("/create", (req, res, next) => {
  const celebDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(celebDetails)
    .then((celeb) => {
      res.redirect("/movies/movies");
    })
    .catch((err) => res.render("movies/new-movie"));
});

router.get("/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate("cast")
    .then((movieId) => {
      res.render("movies/movie-details", { movieId });
    })
    .catch((err) => {
      console.log("error movie id", err);
    });
});

router.post("/:movieId/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/movies/movies");
    })
    .catch((err) => {
      console.log("Error deleting movie...", err);
    });
});

module.exports = router;
