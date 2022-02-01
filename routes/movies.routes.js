// Iteration #5
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// GET route for movies/create:
router.get('/movies/create', (req, res, next) => {
  Celebrity.find()
  .then(listOfCelebrities => res.render('movies/new-movie', { celebrity: listOfCelebrities }))
  .catch(err => console.log('Error retrieving celebrities list: ', err))
});

// POST route for movies/create:
router.post('/movies/create', (req, res, next) => {
  const { title, genre, plot, cast} = req.body;

  Movie.create({title, genre, plot, cast})
  .then(() => res.redirect('/movies'))
  .catch(err => res.render("movies/create"))
});

// Iteration #5 - GET all movies from the database:
router.get("/movies", (req, res) => {
    Movie.find()
      .then((moviesFromDB) => res.render("movies/movies", { movies: moviesFromDB }))
      .catch((err) => console.log(`Error while getting movies from the database: ${err}`));
  });

// Iteration #8 - GET route to display the details of a specific movie:
router.get('/movies/:movieId', (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
  .populate('cast')
  .then(theMovie => res.render('movies/movie-details.hbs', { movie: theMovie }))
  .catch(err => console.log('Error while retrieving movie details: ', err))
});

// Iteration #9 - GET route to display the form to update a specific movie
router.get('/movies/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
 
  Movie.findById(movieId)
    .populate('cast')
    .then(movieToEdit => res.render('movies/edit-movie', { movie: movieToEdit }))
    .catch(err => console.log('Error while retrieving movie details: ', err));
});

// Iteration #9 - POST route to actually make updates on a specific movie
router.post('/movies/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;
 
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then(() => res.redirect(`/movies`))
    .catch(err => console.log('Error while retrieving movie details: ', err));
});

// Iteration #10 - POST route to delete a movie from the database:
router.post('/movies/:movieId/delete', (req, res, next) => {
  const { movieId } = req.params;
 
  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect('/movies'))
    .catch(error => next(error));
});

module.exports = router;