const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/create', async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('movies/new-movie', { title: 'Create a New Movie', celebrities });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/create', async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const newMovie = await Movie.create({ title, genre, plot, cast });
    res.redirect('/movies');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id/edit', async (req, res) => {
    try {
      console.log('Inside edit route');
      const movieId = req.params.id;
      const movie = await Movie.findById(movieId);
      const celebrities = await Celebrity.find();
      res.render('movies/edit-movie', { title: `Edit ${movie.title}`, movie, celebrities });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });
  


router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId).populate('cast');
    res.render('movies/movie-details', { title: movie.title, movie });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().populate('cast');
    res.render('movies/movies', { title: 'All Movies', movies });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/:id/delete', async (req, res) => {
  try {
    const movieId = req.params.id;
    
    await Movie.findByIdAndRemove(movieId);

    res.redirect('/movies');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    
    const updatedMovie = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    };

    await Movie.findByIdAndUpdate(movieId, updatedMovie);

    res.redirect(`/movies/${movieId}`);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
