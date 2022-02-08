const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//==== Create route to /movies
router.get("/", (req, res, next) => {
  Movie.find()
  .populate("cast")
    .then((movieFromDB) => {
      res.render("movies/movies-list", { movie: movieFromDB });
    })
    .catch();
});

//===== Create GET-route for /movies/new-movie
router.get("/new-movie", (req, res, next) => {
  Celebrity.find()
    .then((celebrityDetails) => {
      res.render("movies/new-movie", { celebrity: celebrityDetails });
    })
    .catch((err) => {
      console.log("Error getting celeb details from DB...", err);
    });
});

// ===== Create POST-route for movies/new-movie
router.post("/new-movie", (req, res, next) => {
  const { title, genre, cast, plot } = req.body;
  const movieDetails = req.body;

  Movie.create(movieDetails)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error creating new movie..", err);
    });
});

//==== Create route for /movies/movieId
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .populate("cast")
    .then((movieDetails) => {
      res.render("movies/movie-details", movieDetails);
    })
    .catch((err) => {
      console.log("Error displaying movie..", err);
    });
});

//=== Create GET-route for /movies/movieId/edit
router.get("/:movieId/edit", (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .then((movieDetails) => {
      res.render("movies/edit-movie", movieDetails);
    })
    .catch((err) => {
      console.log("Error getting movie details from DB...", err);
    });
});

// ===== Create POST-route for /movies/movieId/edit
router.post("/:movieId/edit", (req, res, next) => {
  const movieId = req.params.movieId;
  const { title, genre, cast, plot } = req.body;
  const newMovieDetails = req.body;

  Movie.findByIdAndUpdate(movieId, newMovieDetails)
    .then(() => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch((err) => {
      console.log("Error updating movie details", err);
    });
});

//====== Create route for /movies/movieId/delete
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
