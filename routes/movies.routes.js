const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => {
      console.log("There was an error getting all the movies from DB", err);
      next();
    });
});

router.post("/movies/create", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    celebrity: req.body.celebrity,
  };
  Movie.create(newMovie)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("There was an error creating new movie", err);
      next();
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => {
      console.log("There was an error getting all the movies from DB", err);
      next();
    });
});

router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieDetails) => {
      console.log("movieDetails>>>", movieDetails);
      res.render("movies/movie-details", { movieDetails });
    })
    .catch((err) => {
      console.log("There was an error getting movie details from DB", err);
      next();
    });
});

module.exports = router;
