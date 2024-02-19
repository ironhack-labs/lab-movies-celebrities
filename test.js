const router = require('express').Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', (req, res) => {
  Celebrity.find().then((allCelebs) => {
    console.log(allCelebs);
    res.render('movies/new-movie', { celebsforMovies: allCelebs });
  });
});

router.post('/movies/create', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast }).then((newMovie) => {
    console.log('SHOW ME THE NEW MOVIE --> :', newMovie);
    res.redirect('/movies');
  });
});

router.get('/movies', (req, res) => {
  Movie.find().then((allMovies) => {
    console.log(allMovies);
    res.render('movies/movies', { movies: allMovies });
  });
});

module.exports = router;
