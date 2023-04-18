// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find();

  res.render("movies/new-novie").catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      res.render("/movies/new-movie", {
        errorMessage: "There was an error creating the movie. Try again!",
      });
    });
});

module.exports = router;
