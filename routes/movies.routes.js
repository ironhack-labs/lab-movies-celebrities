const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/movie/create", (req, res, next) => {
  Celebrity.find({})
    .then((celeb) => res.render("movies/new-movie", { celeb }))
    .catch((err) => console.log(err));
});

router.post("/movie/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.render("movies/movies", { movie });
    })
    .catch((err) => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((cast) => {
      console.log(cast);
      res.render("movies/movie-details", cast);
    })
    .catch((err) => next(err));
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) =>
    Celebrity.find({})
    .then((celebrities) => res.render('movies/edit-movie', {celebrities, movie})))
    .catch((err) => next(err));
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then((movie) => res.redirect(`/movies/${movie._id}`))
    .catch((err) => next(err));
});

module.exports = router;
