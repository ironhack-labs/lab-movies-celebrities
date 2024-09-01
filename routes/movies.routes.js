
const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', async (req, res) => {
    try {
      const celebrities = await Celebrity.find();
      res.render('movies/new-movie', { celebrities });
    } catch (error) {
      console.error('Error while retrieving celebrities:', error);
      res.render('movies/new-movie', {
        errorMessage: 'Error while retrieving celebrities. Please try again.'
      });
    }
  });
  router.post('/movies/create', async (req, res) => {
    const { title, genre, plot, cast } = req.body;
  
    try {
      const newMovie = new Movie({ title, genre, plot, cast });
      await newMovie.save();
      res.redirect('/movies/create'); 
    } catch (error) {
      console.error('Error while creating a new movie:', error);
      res.render('movies/new-movie', {
        errorMessage: 'Error while creating a new movie. Please try again.'
      });
    }
  });
  
  router.get('/movies', async (req, res) => {
    try {
      const movies = await Movie.find().populate('cast');
      res.render('movies/movies', { movies });
    } catch (error) {
      console.error('Error while retrieving movies:', error);
      res.render('movies/movies', {
        errorMessage: 'Error while retrieving movies. Please try again.'
      });
    }
  });

  
  
  router.get('/create', async (req, res) => {
    try {
      const celebrities = await Celebrity.find();
      res.render('movies/new-movie', { celebrities });
    } catch (error) {
      console.log(error);
      res.redirect('/movies');
    }
  });

  router.post('/create', async (req, res) => {
    try {
      const { title, genre, plot, cast } = req.body;
      const newMovie = new Movie({ title, genre, plot, cast });
      await newMovie.save();
      res.redirect('/movies');
    } catch (error) {
      console.log(error);
      res.redirect('/movies/create');
    }
  });
module.exports = router;