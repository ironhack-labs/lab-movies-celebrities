const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities });
        })
        .catch(err => next(err));
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => next(err));
});

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => next(err));
});


router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    Movie
        .findById(id)
        .then(detail => res.render('movies/movie-details', { detail }))
        .catch((err) => next(err));
})

router.post('/delete/:id', (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => next(err));
});

router.get('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;

    Movie.findById(movieId)
        .then(movie => {
            // Fetch the list of celebrities to use in the select dropdown
            Celebrity.find()
                .then(celebrities => {
                    res.render('movies/edit-movie', { movie, celebrities });
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

router.post('/movies/:id', (req, res, next) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;

    Movie.findById(movieId)
        .then(movie => {
            // Ensure that the 'cast' property is an array
            const castArray = Array.isArray(cast) ? cast : [cast];

            // Update the movie properties
            movie.title = title;
            movie.genre = genre;
            movie.plot = plot;
            movie.cast = castArray;

            // Save the updated movie
            return movie.save();
        })
        .then(() => res.redirect('/movies/' + movieId))
        .catch(err => next(err));
});





module.exports = router;
