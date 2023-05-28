const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model');

// All your routes here
router.get('/create', async (req, res) => {
    try {
      const celebrities = await Celebrity.find();
      res.render('movies/new-movie', { celebrities });
    } catch (error) {
      // Handle the error
    }
  });
  
router.post('/create', async (req, res) => {
    try {
      const { title, genre, plot, cast } = req.body;
      const movie = new Movie({ title, genre, plot, cast });
      await movie.save();
      res.redirect('/movies');
    } catch (error) {
      // Handle the error
    }
  });

router.get('/', async (req, res) => {
    try {
      const movies = await Movie.find();
      res.render('movies/movies', { movies });
    } catch (error) {
      // Handle the error
    }
  });
  
router.get('/:id', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).populate('cast');
      res.render('movies/movie-details', { movie });
    } catch (error) {
      // Handle the error
    }
  });
  
router.post('/:id/delete', async (req, res) => {
    try {
      await Movie.findByIdAndRemove(req.params.id);
      res.redirect('/movies');
    } catch (error) {
      // Handle the error
    }
  });
  
router.get('/:id/edit', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      const celebrities = await Celebrity.find();
      res.render('movies/edit-movie', { movie, celebrities });
    } catch (error) {
      // Handle the error
    }
  });
  
router.post('/:id', async (req, res) => {
    try {
      const { title, genre, plot, cast } = req.body;
      await Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast });
      res.redirect(`/movies/${req.params.id}`);
    } catch (error) {
      // Handle the error
    }
  });
  

module.exports = router;
