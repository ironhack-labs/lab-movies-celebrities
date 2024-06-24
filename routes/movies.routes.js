const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// /movies/create GET route
router.get('/create', async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('movies/new-movie', { celebrities });
  } catch (error) {
    res.render('error', { errorMessage: 'Error while retrieving celebrities.' });
  }
});

// /movies/create POST route
router.post('/create', async (req, res) => {
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect('/movies');
  } catch (error) {
    res.render('movies/new-movie', { errorMessage: 'Error while creating the movie. Please try again.' });
  }
});

// /movies GET route
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('movies/movies', { movies });
  } catch (error) {
    res.render('error', { errorMessage: 'Error while retrieving movies.' });
  }
});

// /movies/:id GET route
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id).populate('cast');
    res.render('movies/movie-details', { movie });
  } catch (error) {
    res.render('error', { errorMessage: 'Error while retrieving movie details.' });
  }
});

// /movies/:id/edit GET route
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id).populate('cast');
    const celebrities = await Celebrity.find();
    res.render('movies/edit-movie', { movie, celebrities });
  } catch (error) {
    res.render('error', { errorMessage: 'Error while retrieving movie details or celebrities.' });
  }
});

// /movies/:id/delete POST route
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    await Movie.findByIdAndRemove(id);
    res.redirect('/movies');
  } catch (error) {
    res.render('error', { errorMessage: 'Error while deleting the movie.' });
  }
});

// /movies/:id/edit POST route
router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.findByIdAndUpdate(id, { title, genre, plot, cast });
    res.redirect(`/movies/${id}`);
  } catch (error) {
    res.render('movies/edit-movie', { errorMessage: 'Error while updating the movie.', movie: { _id: id, title, genre, plot, cast }, celebrities: await Celebrity.find() });
  }
});

module.exports = router;
