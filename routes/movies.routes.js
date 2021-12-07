const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// Create
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render('movies/new-movie', { celebrities: celebritiesFromDB });
        })
        .catch(err => next(err));
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch();
});

// Read
router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(moviesFromDB => res.render('movies/movies', { movies: moviesFromDB }))
        .catch(eer => next(err));
});

// Read
router.get('/movies/:movieId', (req, res, next) => {
    const { movieId } = req.params;
    console.log(movieId);

    Movie.findById(movieId)
        .populate('cast')
        .then(theMovie => res.render('movies/movie-details', theMovie))
        .catch(err => next(err))
});

// Delete 
router.post('/movies/:movieId/delete', (req, res, next) => {
    const { movieId } = req.params;

    Movie.findByIdAndDelete(movieId)
        .then(() => res.redirect('/movies'))
        .catch(err => next(err));
});

// Update
router.get('/movies/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params;

    Movie.findById(movieId)
        .then(theMovieToEdit => {
            Celebrity.find()
                .then(celebritiesFromDB => {
                    res.render('movies/edit-movie', {
                        movie: theMovieToEdit,
                        celebrities: celebritiesFromDB
                    })
                })
                .catch(err => {
                    console.log('Error while retrieving celebrities collection: ', err);
                    next(err);
                })
        })
        .catch(err => {
            console.log('Error while getting movie details: ', err);
            next(err);
        });
});

router.post('/movies/:movieId/edit', (req, res, next) => {

});

module.exports = router;