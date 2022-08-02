// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
        res.render('movies/new-movie', {celebrities: allCelebrities})
    })
    .catch(err => next(err))
})


router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body
    
    Movie.create({title, genre, plot, cast})
    .then((createdMovie) => {
        res.redirect('/movies')
        console.log(createdMovie)
    })
})

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((foundMovie) => {
        res.render('movies/movies', {movies: foundMovie})
    })
    .catch(err => next(err))
})

router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params;

    Movie.findById(id)
    .populate('cast')
    .then((movieDetails) => {
        res.render('movies/movie-details', {movieDetails})
        console.log({movieDetails})
    })
    .catch(err => next(err))
})

router.post('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;

    Movie.findByIdAndRemove(id)
    .then(() => {
        res.redirect('/movies')
    })
    .catch((err) => next(err))
})












module.exports = router;