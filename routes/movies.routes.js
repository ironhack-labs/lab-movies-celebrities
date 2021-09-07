// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.post("/:id/delete", (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndRemove(id)
    .then((deletedMovie) => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  // Celebrity.find();
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log("cast");
      res.render("movies/edit-movie", { movie: movie });
    })
    .catch((err) => console.log(err));
});

router.post("/:id", (req, res) => {
  const id = req.params.id;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie: movie });
    })
    .catch((err) => console.log(err));
});

router.get("/new-movie", (req, res) => {
  Celebrity.find()
    .then((celebs) => {
      res.render("movies/new-movie", { celebs });
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => res.redirect("/movies"))
    .catch((err) => res.redirect("/movies/new-movie"));
});

router.get("/", (req, res) => {
  Movie.find()
    .then((movies) => {
      console.log(movies);
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
