const router = require("express").Router();
const Movie = require("../models/Movie.model");

//==== Create route to /movies
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movieFromDB) => {
      res.render("movies/movies-list", { movie: movieFromDB });
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

  //   const movieDetails = {
  //       //const castArr = req.body.cast.split(",");
  //   }

  Movie.create(movieDetails)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error creating new movie..", err);
    });
});

//==== Create route to movie details
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .then((movieDetails) => {
      res.render("movies/movie-details", movieDetails);
    })
    .catch((err) => {
      console.log("Error displaying movie..", err);
    });
});

//====== Create route for movie delete page
router.post("/:movieId/delete", (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findByIdAndDelete(movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error deleting movie", err);
    });
});

module.exports = router;
