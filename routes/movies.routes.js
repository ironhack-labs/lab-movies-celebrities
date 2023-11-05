const express = require('express')
const router = express.Router()

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log('ERROR listing celebrities', err))

})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body
    console.log(req.body)
    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('ERROR creating movie', err))


})

router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log('ERROR listing movies', err))


})

router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log('ERROR retrieving movie details', err))

})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('ERROR deleting movie', err))

})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log('ERROR retrieving movie', err))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('ERROR updating movie', err))
})

module.exports = router

