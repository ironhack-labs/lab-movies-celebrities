// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");

// create
router.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});

// get
router.get("/movies/movies", (req, res, next) => {
  // Get all movies from db
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies/movies", { movies: moviesFromDB });
    })
    .catch((err) => next(err));
});

// by Id

router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate("celebrity")
    .then((movieFromDB) => {
      console.log(movieFromDB);
      res.render("movies/movie-details", { movies: movieFromDB });
    })
    .catch((err) => next(err));
});

router.get("/movies/edit-movie/:id", (req, res, next) => {
  Book.findById(req.params.id)
    .then((bookFromDB) => {
      res.render("movies/edit-movie", { movies: movieFromDB });
    })
    .catch((err) => next(err));
});
// post
router.post("/movies", (req, res, next) => {
  console.log(req.body);
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      console.log(createdMovie);
      // Redirect to celebrity details route
      res.redirect(`/movies/movies`);
    })
    .catch((err) => next(err));
});

// Edit movies
router.get("/movies/:id/edit-movie", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.findById(req.params.id, {
    title,
    genre,
    plot,
    cast,
  })
    .then(() => {
      // Redirect to movie details route
      res.redirect(`/movies/edit-movie/${req.params.id}`);
    })
    .catch((err) => next(err));
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemote(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

// all your routes here
module.exports = router;
