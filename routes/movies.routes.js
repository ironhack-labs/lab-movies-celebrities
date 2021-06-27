const router = require("express").Router()
const Movies = require('../models/Movies.model')
const Celebrity = require('./../models/Celebrity.model') 

router.get("/movies", (req, res, next) => {
    Movies
        .find()
        .then(movies => {res.render('movies/movies', { movies }) })
        .catch(err => console.error(err))
}) 

router.get('/movies/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => {res.render('movies/new-movie', { celebrities })})
        .catch(err => console.error(err)) 
})

router.post('/movies/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body 
    Movies
        .create(req.body)
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/new-movie'))
})

router.get('/:movieId', (req, res, next) => {
    Movies
        .findById(req.params.movieId)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.error(err)) 
})

router.post('/movies/:movieId/delete', (req, res, next) => {
    Movies
        .findByIdAndRemove(req.params.movieId)
        .then(() => res.redirect('/movies'))
        .catch(err => console.error(err)) 
}) 

router.get('/movies/:movieId/edit', (req, res, next) => {
    const { movieId } = req.query
    Movies
        .findById(movieId)
        .then(theMovie => {res.render('movies/edit-movie', theMovie)}) 
        .catch(err => console.error(err)) 
}) 

router.post('/movies/:movieId/edit', (req, res, next) => {
    const { movieId } = req.query
    const { title, genre, plot, cast } = req.body
    Movies
      .findByIdAndUpdate(movieId, { title, genre, plot, cast })
      .then(() => res.redirect("movies/movies"))
      .catch(err => console.log(err))
})

module.exports = router 