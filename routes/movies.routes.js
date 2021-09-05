const router = require('express').Router();

// all your routes here
const Movie = require('./../models/Movie.model');
const Celebrity = require('./../models/Celebrity.model');

router.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/movies', { movies });
    })
    .catch(err => console.error(err));
});

router.get('/create', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('movies/new-movie', { celebrities });
    })
    .catch(err => console.error(err));
});

router.post('/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      res.render('movies/new-movie', {
        errorMessage: 'Cannot create movie',
      });
    });
});

router.get('/', (req, res, next) => {
  res.render('movies/movies');
});

router.get('/:movieId', (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('cast')
    .then(movie => res.render('movies/movie-details', movie))
    .catch(err => console.error(err));
});

router.post('/:movieId/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then(() => res.redirect('/movies'))
    .catch(err => console.error(err));
});

router.get('/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
  let currentMovie = {};
  let currentCelebrities = {};
  Movie.findById(movieId)
    .then(movie => {
      currentMovie = movie;
      return Celebrity.find();
    })
    .then(celebrities => {
      currentCelebrities = celebrities;

      res.render('movies/edit-movie', { currentMovie, currentCelebrities });
    })
    .catch(err => console.log(err));
});

router.post('/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then(movie => res.redirect(`movies/${movieId}`))
    .catch(err => console.log(err));
});

module.exports = router;
