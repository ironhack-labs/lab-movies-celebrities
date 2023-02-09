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
        res.redirect("/movies/movies");
      })
      .catch((err) => next(err));
  }
});

router.get("/movies/movies", (req, res, next) => {
  Movie.find()
    .then((allMoviesFromDb) =>
      res.render("movies/movies", { movies: allMoviesFromDb })
    )
    .catch((err) => next(err));
});

router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieIndex) =>
      res.render("movies/movie-details", { movie: movieIndex })
    )
    .catch((err) => next(err));
});

router.post("/movies/:movieId/delete", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect("/movies/movies"))
    .catch((err) => next(err));
});

router.get("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;

  Promise.all([Movie.findById(movieId), Celebrity.find()])
    .then(([movieToEdit, celebrities]) =>
      res.render("movies/edit-movies", {
        movie: movieToEdit,
        cast: celebrities,
      })
    )
    .catch((err) => next(err));
});

router.post("/movie/:movieId", (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => {
      console.log("Successfully updated movie:", updatedMovie);
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch((err) => {
      console.error("Error updating movie:", err);
      next(err);
    });
});

module.exports = router;
