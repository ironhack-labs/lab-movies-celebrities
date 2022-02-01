const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//CREAT NEW MOVIE

router.get("/movies/create", (req, res, next) => {
  Celebrity.find().then((foundCelebs) => {
    res.render("movies/new-movie", { celebs: foundCelebs });
  });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  console.log(title, genre, plot, cast);
  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      console.log("added movie " + newMovie.title);
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
      next(error);
      res.redirect("/movies/create");
    });
});

//DISPLAY ALL MOVIES

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      console.log(allMovies);
      res.render("movies/movies", { movies: allMovies });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

//DISPLAY MOVIE DETAILS

router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      res.render("movies/movie-details", { foundMovie });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
