// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie  = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/movie-create', (req, res, next) => {
    Celebrity.find()
    .then((data) => {
        res.render('movies/new-movie', {data})
    })
    .catch((err) => next(err));
})

router.post('/movie-create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect('/movies'))
    .catch((err) => next(err));
 });

 router.get('/movies', (req, res, next) => {
    Movie.find()
    .populate('cast')
    .then((data) => {
        res.render('movies/movies', {data});
    })
    .catch((err) => next(err));
 })

 router.get('/movies/:movieID', (req, res, next) => {
    const {movieID} = req.params;

    Movie.findById(movieID)
    .populate('cast')
    .then((oneMovie) => {
        res.render('movies/movie-details', oneMovie);
    })
    .catch((err) => next(err));
 });

module.exports = router;