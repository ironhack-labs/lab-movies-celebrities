// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies", (req, res, next) => {
  Movie.find({})
  .then((movies) => res.render("movies/movies", {movies}))
  .catch(() => next(err))
});

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebs) => {
      res.render("movies/new-movie", { celebs });
    });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({title, genre, plot, cast})
  .then(() => res.redirect("/movies"))
  .catch(() => res.render("movies/new-movie"))
});

router.post('/movies/:id/delete', (req, res, next) => {
  const {id} = req.params
  Movie.findByIdAndRemove(id)
  .then(() => res.redirect("/movies"))
  .catch((err) => next(err))
})

router.get('/movies/:id/edit', (req, res, next) => {
  const {id} = req.params
  Movie.findById(id)
  .then((details) => Celebrity.find({}))
  
})

router.get('/movies/:id', (req, res, next) => {
  const {id} = req.params
  Movie.findById(id)
  .populate('cast')
  .then((details) => res.render("movies/movie-details", {details})).catch((err) => next(err))
})

module.exports = router;
