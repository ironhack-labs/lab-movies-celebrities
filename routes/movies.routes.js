// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here

router.get('/create', (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) =>
      res.render('movies/new-movie', { allCelebrities })
    )
    .catch((err) => {
      console.log(err);
    });
});

router.post('/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(res.redirect('/movies'))
    .catch((err) => {
      console.log(err);
    });
});

router.get('/', (req, res, next) => {
  Movie.find()
    .then((allMovies) => res.render('movies/movies', { allMovies }))
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate('cast')
    .then((movieDetails) => {
      res.render('movies/movie-details', { movieDetails });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/:id/delete', (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate('cast')
    .then((movieById) => {
      Celebrity.find()
      .then((celeb) => {res.render('movies/edit-movie', { movieById , celeb})
    });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/:id/edit', (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(
    id,
    { title, genre, plot, cast },
    { new: true }
  )
    .then((editedMovie) => {
      console.log(editedMovie);
      res.redirect(`/movies/${editedMovie._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
