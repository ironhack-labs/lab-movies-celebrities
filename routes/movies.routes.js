// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const router = require("express").Router();

// all your routes here
router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(moviesFromDB => {
            res.render('movies/movies', { movies: moviesFromDB });
        })
        .catch(err => {
            console.log('error getting movies from DB...', err);
            next(err);
        })
})

router.get('/movies/:movieId', (req, res, next) => {
    const id = req.params.movieId;

    Movie.findById(id)
    .populate('cast')
    .then(movieDetails => {
        res.render('movies/movie-details', movieDetails);
    })
    .catch(err => {
        console.log('error getting movie details from DB', err)
        next(err);
    })
});

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((celebrityArr) => {
        res.render('movies/new-movie', {celebrityArr});
    })
    .catch(err => {
        console.log('error getting celebrities from DB', err);
        next(err);
    })
})

router.post('/movies/create', (req, res, next) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }
    Movie.create(movieDetails)
    .then((movieDetails) => {
        res.redirect('/movies');
    })
    .catch((err) => {
        res.redirect('/movies/new-movie');
    })
});

module.exports = router;