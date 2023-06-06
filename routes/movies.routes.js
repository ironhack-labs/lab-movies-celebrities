const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie", { celebritiesArr: celebritiesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/create", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.create(newMovie)
    .then((newMovie) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render("movies/movies", { movies: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/:movieID", (req, res, next) => {
  Movie.findById(req.params.movieID)
    .populate("cast")
    .then((moviesByID) => {
      console.log(moviesByID);
      res.render("movies/movie-details", { movieID: moviesByID });
    });
});

module.exports = router;
