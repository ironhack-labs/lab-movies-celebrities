const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const { populate } = require("../models/Movie.model");
// all your routes here
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res) => {
  Celebrity.find().then((celebs) => {
    res.render("movies/new-movie", { celebs });
  });
});

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch(() => res.render("movies/new-movie"));
});

router.get("/movies", (req, res) => {
  Movie.find().then((movies) => {
    res.render("movies/movies", { movies: movies });
  });
});

router.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie: movie });
    });
});

router.post("/movies/:id/delete", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id).then(() => res.redirect("/movies"));
});

router.get("/movies/:id/edit", (req, res) => {
  const { id } = req.params;
  console.log(id);
  //const celebrity = Celebrity.find();
  //   Movie.findById(id).then(() => Celebrity.find());

  Celebrity.find().then((celebs) => {
    Movie.findById(id)
      .populate("cast")

      .then((movie) => {
        res.render("movies/edit-movie", { movie, celebs });
      });
  });
});

router.post("/movies/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  Movie.findByIdAndUpdate(id, req.body).then((updatedMovie) => {
    console.log(updatedMovie);

    res.redirect("/movies/" + id);
  });
});
module.exports = router;
