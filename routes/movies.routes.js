// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

// CREATE: Render form
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesArr) => {
      res.render("movies/new-movie", { celebritiesArr });
    })
    .catch((error) => {
      console.log("Error getting movies from DB", error);
      next(error);
    });
});

// CREATE: Process form
router.post("/movies/create", (req, res, next) => {
  const movieDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(movieDetails)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error creating movie in the DB", error);
      next(error);
    });
});

//list movies

router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((moviesFromDB) => {
      res.render("movies/movies", { moviesFromDB });
    })
    .catch((error) => {
      console.log("Error getting data from DB", error);
      next(error);
    });
});

// READ: Movie details
router.get("/movies/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieDetails) => {
      console.log(movieDetails);
      res.render("movies/movie-details", movieDetails);
    })
    .catch((error) => {
      console.log("Error getting movie details from DB", error);
      next(error);
    });
});

// DELETE: delete movies
router.post("/movies/:moviesId/delete", (req, res, next) => {
  const { moviesId } = req.params;

  Movie.findByIdAndRemove(moviesId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error deleting movies from DB", error);
      next(error);
    });
});

// UPDATE: Render form
router.get("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movieDetails) => {
      res.render("movies/edit-movie", movieDetails);
    })
    .catch((error) => {
      console.log("Error getting movie details from DB", error);
      next(error);
    });
});

// UPDATE: Process form
router.post("/movies/:movieId/edit", (req, res, next) => {
  const movieId = req.params.movieId;

  const newDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
  };

  Movie.findByIdAndUpdate(movieId, newDetails)
    .then(() => {
      //   res.redirect(`/movies/${movieId}`); // redirect to movie details page
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error updating movie in DB", error);
      next(error);
    });
});

module.exports = router;
