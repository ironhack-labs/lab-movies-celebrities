// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model")

// all your routes here
//CREATE: display form
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then(( celebritiesArr ) => {
      res.render("movies/new-movie", { celebritiesArr });
    })
    .catch((err) => {
      console.log("error getting celebrities from DB", err);
      next(err);
    });
});

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
  const movieDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(movieDetails)
    .then((movieDetails) => {
        console.log(movieDetails);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error creating new movie in DB", err);
      next(err);
    });
});


module.exports = router;