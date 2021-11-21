const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// Create movie
router
  .route('/create')
  .get((req, res) => {
    // we need the celebrities to populate the Select in the form!
    Celebrity.find()
      .then(allCelebrities => {
        res.render('movies/new-movie', { allCelebrities });
      })
      .catch(error => res.render('error', { error: error }));
  })
  .post((req, res) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, genre, cast })
      .then(movie => {
        res.redirect('/movies');
      })
      .catch(error => {
        res.render('movies/new-movie', { errorCreation: error });
      });
  });

// Edit movie
router
  .route('/edit/:id')
  .get((req, res) => {
    Movie.findById(req.params.id).then(movie => {
      // we need the celebrities to populate the Select in the form!
      Celebrity.find()
        .then(allCelebrities => {
          res.render('movies/edit-movie', { allCelebrities, movie: movie });
        })
        .catch(error => res.render('error', { error: error }));
    });
  })
  .post((req, res) => {
    const { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, genre, cast })
      .populate('cast')
      .then(() => {
        res.redirect('/movies');
      })
      .catch(error => {
        res.render('movies/edit-movie', { errorCreation: error });
      });
  });

// List movies
router.get('/', (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then(movies => {
      res.render('movies/movies', { movies: movies });
    })
    .catch(error => res.render('error', { error: error }));
});

// Delete movie
router.get('/delete/:id', (req, res, next) => {
  Movie.findByIdAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(error => res.render('error', { error: error }));
});

// Movie Page
router.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      res.render('movies/singleMovie', movie);
    })
    .catch(error => res.render('error', { error: error }));
});

module.exports = router;
