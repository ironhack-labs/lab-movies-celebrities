const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// GET route to render the form to create a new movie
router.get('/create', (req, res) => {
  Celebrity.find({}, (err, celebrities) => {
    if (err) {
      console.log(err);
    } else {
      res.render('movies/new-movie', {celebrities: celebrities});
    }
  });
});

// POST route to handle the form submission and create a new movie
router.post('/create', (req, res) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
  };

  Movie.create(newMovie, (err, movie) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/movies');
    }
  });
});


// GET route to show all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('movies/movies', { movies });
  } catch (err) {
    console.error(err);
    res.render('error');
  }
});

// GET route to show a specific movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cast');
    res.render('movies/movie-details', { movie });
  } catch (err) {
    console.error(err);
    res.render('error');
  }
});


module.exports = router;