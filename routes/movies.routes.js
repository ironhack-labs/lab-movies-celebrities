// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res, next) => {
  Celebrity.find({})
    .then((celeb) => {
      res.render("movies/new-movie", { celeb });
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;


  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("/movies/new-movie"));
});

router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then((movie) => res.render("movies/movies", { movie }))
    .catch((err) => console.log(err));
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => res.render("movies/movie-details", movie))
    .catch((err) => console.log(err));
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;
    let selectedMovie;
    Movie.findById(id).then((movie) =>
    {
        selectedMovie = movie;
     }).then(Celebrity.find({}))
        .then((celeb) => { res.render("movies/edit-movie", selectedMovie, celeb) })
    .catch((err) => console.log(err));
});

router.post("/movies/:id", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate({ title, genre, plot, cast })
    .then(() => res.redirect("/movies/:id"))
    .catch((err) => console.log(err));
});

module.exports = router;
