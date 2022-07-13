const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here

//See all movies

router.get("/movies", (req, res) => {
  MovieModel.find()
    .populate("cast")
    .then((moviesDetails) => {
      const data = { moviesDetails };
      res.render("movies/movies", data);
    })
    .catch((error) => {
      console.log("Error retrieving movies from the database. ", error);
      next(error);
    });
});

//Create movies

router.get("/movies/create", (req, res) => {
  CelebrityModel.find()
    .then((celebritiesDetails) => {
      const data = { celebritiesDetails };
      res.render("movies/new-movie", data);
    })
    .catch((error) => {
      console.log("Error retrieving movies from DB, ", error);
      next(error);
    });
});

router.post("/movies/create", (req, res) => {
  const movieInfo = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  MovieModel.create(movieInfo)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error creating new movie, ", error);
      next(error);
    });
});

//Getting details from one movie

router.get("/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;

  MovieModel.findById(movieId)
    .populate("cast")
    .then((movieDetails) => {
      res.render("movies/movie-details", movieDetails);
    })
    .catch((error) => {
      console.log("Error getting movie details from DB", error);
      next(error);
    });
});

//Deleting a movie

router.post("/movies/:movieId/delete", (req, res) => {
  const movieId = req.params.movieId;

  MovieModel.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error deleting movie from DB", error);
      next(error);
    });
});

//Updating movie

router.get("/movies/:movieId/edit", (req, res) => {
  const movieId = req.params.movieId;
  let movies = MovieModel.findById(movieId);
  let celebrities = CelebrityModel.find();
  Promise.all([movies,celebrities])
    .then((array) => {
        const moviesData = array[0];
        const celebritiesData = array[1];
      res.render("movies/edit-movie", {moviesData, celebritiesData});
    })
    .catch((error) => {
      console.log("Error retrieving movies from DB, ", error);
      next(error);
    });
});

router.post("/movies/:movieId/edit", (req, res) => {
  const movieId = req.params.movieId;

  const movieInfo = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  MovieModel.findByIdAndUpdate(movieId, movieInfo)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error creating new movie, ", error);
      next(error);
    });
});

module.exports = router;
