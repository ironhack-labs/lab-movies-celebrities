const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");

router.get("/", (req, res, next) => {
  Movie.find()
    .then((moviesFromTheDB) => {
      res.render("movies", { movies: moviesFromTheDB });
    })
    .catch((error) => {
      console.log("Error, no movies for you ", error);

      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((thisMovie) => {
      res.render("movie", { movie: thisMovie });
    })
    .catch((error) => {
      console.log("Error, no movies for you ", error);

      next(error);
    });
});

module.exports = router;
