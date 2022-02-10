const router = require("express").Router();
const { route } = require(".");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/", (req, res, next) => {
  Movie.find()
  .populate("cast")
    .then((moviesFromDB) => {
      res.render("movies/movies", { movie: moviesFromDB });
    })
    .catch((err) => console.log("Error", err));
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie", { celebrity: celebritiesFromDB });
    })
    .catch((err) => console.log("Error", err));
});

router.post("/create", (req, res, next) => {
  const movie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.create(movie)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => console.log("Error", err));
});

router.get("/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate("cast")
    .then((movie) => {
        console.log(movie)
      res.render("movies/movie-details", movie);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

router.post("/:movieId/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error", err);
    });
});


router.get("/:movieId/edit", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movieToEdit) => {
      res.render("movies/edit-movie", movieToEdit);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

router.post("/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;
  const {cast} = req.params
  const movie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.findByIdAndUpdate(movieId, movie)
    .then(() => res.redirect(`/movies/${movieId}`))
    .catch((err) => {
      console.log("error", err);
    });
});

module.exports = router;
