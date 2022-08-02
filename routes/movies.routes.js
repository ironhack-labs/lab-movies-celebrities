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












module.exports = router;