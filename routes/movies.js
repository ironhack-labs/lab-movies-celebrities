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

//===== Create GET-route for /movies/new-movie
router.get("/new-movie", (req, res, next) => {
  Movie.find()
    .then((movieDetails) => {
      res.render("movies/new-movie", { movie: movieDetails });
    })
    .catch((err) => {
      console.log("Error getting movie details from DB...", err);
    });
});

// ===== Create POST-route for movies/new-movie submit page
router.post("/new-movie", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const movieDetails = req.body;

  Movie.create(movieDetails)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error creating new movie..", err);
    });
});

module.exports = router;
