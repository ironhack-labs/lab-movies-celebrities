const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find().populate('cast');
    res.render('movies/movies', { movies });
  } catch (err) {
    console.log(`Err while getting the posts from the DB: ${err}`);
    next(err);
  }
});

router.get('/create', async function (req, res, next) {
  try {
    const celebrities = await Celebrity.find({});
    console.log(celebrities);
    res.render('movies/new-movie', { celebrities });
  } catch (error) {
    console.log(`There was a problem : ${error.message}`);
    next(error);
  }
});

router.post('/create', async function (req, res, next) {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect('/movies');
  } catch (err) {
    res.render('movies/new-movie');
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId).populate('cast');
    res.render('movies/movie-details', movie);
  } catch (err) {
    console.log(`Err while getting the posts from the DB: ${err}`);
    next(err);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByIdAndDelete(movieId);
    res.redirect('/movies');
  } catch (err) {
    console.log(`Err while getting the posts from the DB: ${err}`);
    next(err);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    const actors = await Celebrity.find({});
    // actors.forEach(actor => if(movie.cast.includes()))
    console.log(actors);
    console.log(movie.cast);
    actors.forEach((actor) => {
      if (movie.cast.includes(actor['_id'])) {
        actor.selected = true;
      }
    });
    res.render('movies/edit-movie', { movie, actors });
  } catch (err) {
    console.log(`Err while getting the posts from the DB: ${err}`);
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
    const movie = await Movie.findByIdAndUpdate(
      movieId,
      { title, genre, plot, cast },
      { new: true }
    );
    res.redirect('/movies');
  } catch (err) {
    console.log(`Err while getting the posts from the DB: ${err}`);
    next(err);
  }
});

module.exports = router;
