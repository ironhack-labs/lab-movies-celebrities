const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// GET create new movie page
router.get('/create', async (req, res, next) => {
  try {
    const loadCelebrities = await Celebrity.find();
    res.render('./movies/newMovie.hbs', {
      loadCelebrities: loadCelebrities,
    });
  } catch (err) {
    console.log('Error:', err);
  }
});

// POST create new movie
router.post('/create', async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    const createdMovie = await Movie.create({ title, genre, plot, cast });
    res.redirect('/movies');
  } catch (err) {
    console.log('Error:', err);
    res.render('./movies/newMovie.hbs');
  }
});

// GET movies pages
router.get('/', async (req, res, next) => {
  try {
    const showMovies = await Movie.find();
    res.render('./movies/movies.hbs', {
      showMovies: showMovies,
    });
  } catch (err) {
    console.log('Error:', err);
  }
});

// GET movie details
router.get('/:id', async (req, res, next) => {
  try {
    const showMovieDetails = await Movie.findById(req.params.id).populate(
      'cast'
    );
    res.render('./movies/movieDetails.hbs', showMovieDetails);
  } catch (err) {
    console.log('Error:', err);
  }
});

// POST delete movie
router.post('/:id/delete', async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/movies');
  } catch (err) {
    console.log('Error:', err);
  }
});

// GET edit movie page
router.get('/:id/edit', async (req, res, next) => {
  try {
    const editMovie = await Movie.findById(req.params.id);
    const editCelebrity = await Celebrity.find();
    res.render('./movies/editMovie.hbs', {editMovie, editCelebrity});
  } catch (err) {
    console.log('Error:', err)
  };
});

// POST edit movie
router.post('/:id', async (req, res, next) => {
  const {title, genre, plot, cast} = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast}, {new: true});
    res.redirect(`${req.params.id}`);
  } catch (err) {
    console.log('Error:', err);
  };
});

module.exports = router;
