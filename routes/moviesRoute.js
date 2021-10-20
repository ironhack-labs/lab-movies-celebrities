const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res, next) => {

  Celebrity.find()
    .then((celebrityFromDB) => {
      const movieData = {
        celebrityArr: celebrityFromDB
      }
      res.render("movies/new-movie", movieData);
    })
    .catch((error) => {
      console.log("Error getting movies from DB", error);
      next(error);
    });
})
router.post("/movies/create", (req, res, next) => {

  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies")

    })
    .catch((error) => {
      console.log("Error creating", error);
      next(error);

    });
})

router.get("/movies/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('cast')
    .then((movieDetails) => {
      res.render("movies/movie-details", { mDetail: movieDetails });
    })
    .catch((error) => {
      console.log("Error getting movie details from DB", error);
      next(error);
    });
})

router.get("/movies", (req, res, next) => {

  Movie.find()
    .then((allMoviesFromDB) => {
      res.render("movies/movies", { allMoviesArr: allMoviesFromDB })
    })
    .catch((error) => {
      console.log("Error getting movies from DB", error);
      next(error);
    });
})
router.post("/movies/:movieId/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error deleting movie  from DB", error);
      next(error);
    });
})






module.exports = router;