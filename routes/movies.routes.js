// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// all your routes here
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then(allTheCelebritiesFromDB => {
        res.render('movies/new-movie.hbs', { celebrities: allTheCelebritiesFromDB });
    })
    .catch(error => next(error));
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect('/movies'))
    .catch(error => next(error));
});

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(allTheMoviesFromDB => {
        console.log('Retrieved movies from DB:', allTheMoviesFromDB);
        res.render('movies/movies.hbs', { movies: allTheMoviesFromDB });
    })
    .catch(error => {
        console.log('Error while getting the movies from the DB: ', error);
        next(error);
    });
});

module.exports = router;