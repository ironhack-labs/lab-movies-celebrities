// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movies = require("../models/movie.model");

//CREATE: display form
router.get("/movies/create", (req, res, next) => {
  Movies.find()
    .then((moviesFromDB) => {
      res.render("movies/new-movie", moviesFromDB);
    })
    .catch((err) => {
      console.log("oops, we could not create it");
    });
});

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: [req.body.cast],
  };

  Movies.create(newMovie)
    .then((newMovie) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error creating new movie");
      res.redirect("movies/new-movie");
    });
});

module.exports = router;
