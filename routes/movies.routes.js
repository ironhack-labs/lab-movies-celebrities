const router = require("express").Router();
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
  const {title, genre, plot, cast} = req.body;
  try {
    const createdMovie = await Movie.create({title, genre, plot, cast});
    console.log(createdMovie);
    res.redirect('/movies');
  } catch (err){
    console.log('Error:', err)
    res.render('./movies/newMovie.hbs');
  };
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
  };
});

// GET movie details
router.get('/:id', async (req, res, next) => {
  try {
    const showMovieDetails = await Movie.findById(req.params.id).populate('cast');
    // console.log(showMovieDetails)
    res.render('./movies/movieDetails.hbs', showMovieDetails);
  } catch (err) {
    console.log('Error:', err)
  }
});

module.exports = router;
