// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model');

router.get("/movies", async(req, res, next) => {
  const allMovies = await Movie.find();
    res.render("movies/movies", {allMovies});
  });

router.get('/movies/create', async(req, res, next) => {
  const allCelebrities = await Celebrity.find();
  res.render('movies/new-movie', {allCelebrities});

});


router.post('/movies/create', async(req, res, next) => {

  const {title, genre, plot, cast} = req.body;

  const newMovie = await Movie.create({title, genre, plot, cast});

  res.redirect('/movies');

});

router.get('/movies/:id', async(req, res) => {

  const movieId = req.params.id;

  const pickedMovie = await Movie.findById(movieId).populate("cast");

  res.render('movies/movie-details', {pickedMovie})
});

router.post('/movies/:id/delete', async(req, res) => {
  const movieId = req.params.id;

  await Movie.findByIdAndRemove(movieId);

  res.redirect("/movies");

});

router.get('/movies/:id/edit', async(req, res) => {
  const movieId = req.params.id;

  await Movie.findById(movieId)

});

router.post('/movies/:id/edit', async(req, res) => {
  const movieId = req.params.id;

});

module.exports = router;

