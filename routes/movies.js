
const router = require("express").Router();
const Movie = require("../models/Movie.model");

//==== Create route to /movies
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movieFromDB) => {
      res.render("movies/movies-list", { movies: movieFromDB });
    })
    .catch();
});


module.exports = router;
