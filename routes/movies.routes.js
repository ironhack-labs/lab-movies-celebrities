const router = require("express").Router();
const { route } = require(".");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/", (req, res, next) => {
  Movie.find()
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
  console.log(req.body)
  Movie.create(movie)
    .then((movie) => {
      res.redirect("/");
    })
    .catch((err) => console.log("Error", err));
});

module.exports = router;
