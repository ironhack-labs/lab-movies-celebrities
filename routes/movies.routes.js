const express = require('express');
const router = express.Router();

// require the models
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

/* ROUTES HANDLING */

// GET /movies/create
router.get('/movies/create', async (req, res, next) => {
    try {
        const celebritiesData = await Celebrity.find({});
        res.render('movies/new-movie', { celebrity: celebritiesData });
    } catch(err) {
        console.log(err);
    }
});

// GET /movies/:id
router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
      .populate('cast')
      .then(movie => {
        res.render('movies/movie-detail', { movie });
      })
      .catch(error => {
        console.log('Error while retrieving movie details: ', error);
        next(error);
      });
});

// GET /movies/:id/edit
router.get('/movies/:id/edit', (req, res, params) => {

    const {id} = req.params;

    let movieDetails;

    Movie.findById(id)
        .then(movieFromDB => {
            movieDetails = movieFromDB;
            return Celebrity.find();
        })
        .then( celebritiesArr => {

            res.render('movies/edit-movie', {movie: movieDetails, celebrity: celebritiesArr });
        })
        .catch(err => {
            console.error(err);
        });
});

// GET /movies
router.get('/movies', (req, res, next) => {
    Movie.find({})
        .then(moviesArr => {
            res.render('movies/movies', {movie: moviesArr})
        })
        .catch(err => {
            console.error(err);
        });
});


// POST /movies/create
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({title, genre, plot, cast})
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            res.render('/movies/new-movie', { errorMessage: 'There was an error creating the movie. Try again!'});
        });
});

// POST /movies/:id/edit
router.post('/movies/:id/edit', (req, res, next) => {

    const {id} = req.params;
    const { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then((updatedMovie) => {
            res.redirect(`/movies/${updatedMovie.id}`);
        })
        .catch(err => {
            console.error(err);
        });
});


// POST /movies/:id/delete
router.post('/movies/:id/delete', (req, res, next) => {

    const {id} = req.params;

    Movie.findByIdAndDelete(id)
        .then( () => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;