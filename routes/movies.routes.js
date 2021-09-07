// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//GET MOVIES
router.get("/", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) =>
      res.render("movies/movies", { movies: moviesFromDB })
    )
    .catch((err) => next(err));
});

//GET CREATE
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebsFromDB) =>
      res.render("movies/new-movie", { celebrities: celebsFromDB })
    )
    .catch((err) => next(err));
});

//POST CREATE
router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(res.redirect("/movies"))
    .catch((err) => next(err));
});

//GET MOVIE
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => res.render("movies/movie-details", movie))
    .catch((err) => next(err));
});

//POST DELETE
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(res.redirect("/movies"))
    .catch((err) => next(err));
});

//GET EDIT
router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Promise.all([Movie.findById(id), Celebrity.find()])
    .then((data) =>
      res.render("movies/edit-movie", { movie: data[0], celebrities: data[1] })
    )
    .catch((err) => next(err));
});

//POST EDIT
router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(res.redirect(`/movies/${id}`))
    .catch((err) => next(err));
});

module.exports = router;
