// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { route } = require(".");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebritiesFromDb) =>
      res.render("movies/new-movie", { celebrities: allCelebritiesFromDb })
    )
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  if (title !== "" && genre !== "" && plot !== "" && cast !== [{}]) {
    Movie.create({ title, genre, plot, cast })
      .then((newMovie) => {
        res.render("movies/movies", { movie: newMovie });
      })
      .catch((err) => next(err));
  } else {
    res.redirect("/movies/create");
  }
});

router.get("/movies/movies", (req, res, next) => {
  Movie.find()
    .then((allMoviesFromDb) =>
      res.render("movies/movies", { movies: allMoviesFromDb })
    )
    .catch((err) => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("name occupation catchPhrase")
    .populate({
      // we are populating movie in the previously populated cast
      path: "movies",
      populate: {
        path: "cast",
        model: "Movie",
      },
    })
    .then((movieIndex) => res.render("movies/movie-details", movieIndex))
    .catch((err) => next(err));
});

module.exports = router;
