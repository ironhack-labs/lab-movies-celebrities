// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model")

// all your routes here

//READ: List all movies
router.get("/movies", (req, res, next) => {
    Movie.find()
      .populate("cast")
      .then( moviesFromDB => {
          res.render("movies/movies", {movies: moviesFromDB})
      })
      .catch( err => {
        console.log("error getting books from DB", err);
        next(err);
      })
  });


//READ: Movie details
router.get("/movies/:movieId", (req, res, next) => {
    const id = req.params.movieId;
  
    Movie.findById(id)
      .populate("cast")
      .then((movieDetails) => {
        res.render("movies/movie-details", movieDetails);
      })
      .catch((err) => {
        console.log("error getting movie details from DB", err);
        next(err);
      });
  });

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