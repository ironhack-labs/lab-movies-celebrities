// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/movie.model");
// all your routes here

router.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch(console.log);
});

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celebridades) => {
      res.render("movies/new-movie", { celebridades });
    })
    .catch(console.log);
});

router.post("/movies/create", (req, res) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(console.log);
});

router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((pelicula) => {
      res.render("movies/movie-details", { pelicula });
    })
    .catch(console.log);
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(console.log);
});

router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.render("movies/edit-movie", { movie });
    })
    .catch();
});

router.post("/movies/:id/edit", (req, res, next) => {
  Movie.findByIdAndUpdate(`${req.params.id}`, req.body)
    .then(res.redirect(`/movies/${req.params.id}`))
    .catch(console.log);
});

module.exports = router;
