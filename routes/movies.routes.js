const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
router.get('/movies/create', (req, res) => {
  Celebrity.find().then((allCelebrities) => {
    res.render('movies/new-movie', { cast: allCelebrities });
  });
});

router.post('/movies/create', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      console.log('New movie created: ', newMovie);
      res.redirect('/movies');
    })
    .catch(() => res.redirect('movies/new-movie'));
});

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movieFromDB) => res.render('movies/movies', { movies: movieFromDB }))
    .catch((error) => next(error));
});

router.get('/movies/:id', (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate('cast')
    .then((movieDetails) => res.render(`movies/movie-details`, { movieDetails }))
    .catch((error) => next(error));
});

router.get('/movies/:id/edit', (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate('cast')
    .then((movieEdit) => {
      Celebrity.find().then((celebritiesEdit) => res.render(`movies/movie-edit`, { movieEdit, celebritiesEdit }));
    })
    .catch((error) => next(error));
});

router.post('/movies/:id/edit', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const movieId = req.params.id;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .populate('cast')
    .then(() => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch((error) => next(error));
});

router.post('/movies/:id/delete', (req, res, next) => {
  const movieId = req.params.id;

  Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect('/movies'))
    .catch((error) => next(error));
});

module.exports = router;
