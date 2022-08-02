const router = require("express").Router();
const { populate } = require("../models/Celebrity.model");
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


// all your routes here
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
    res.render('movies/new-movie', {allCelebrities})})  
    .catch(error => next(error));
    })

router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast})
    .then((createdMovie) => {
    res.redirect('/movies')
    .catch(error => next(error));
    });
})

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((createdMovie) => {
    res.render('movies/movies', {createdMovie})
    .catch(error => next(error));
    })
})

router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params;

    Movie.findById(id)
    .populate('cast')
    .then((movieDetails) => {
    res.render('movies/movie-details', movieDetails)})
    .catch(error => next(error));
})


router.get('/movies/create', (req, res, next) => {
    Movie.find()
    .then((allMovies) => {
    res.render('movies/new-movie', {allMovies})})  
    .catch(error => next(error));
    });



module.exports = router;