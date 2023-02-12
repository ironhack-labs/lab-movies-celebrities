const express = require('express')
const router = express.Router()

const Movie = require('../models/Movies.model')
const Celebrity = require('../models/Celebrity.model')

// Movies list
router.get('/', (req, res) => {

    Movie
        .find()
        .populate('cast')
        .then(movies => res.render('./movies/movies', { movies }))
        .catch(err => console.log(err))

})

// Create a new movie
router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('./movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(res.redirect('./'))
        .catch(res.redirect('./create'))
})

// Movie details with Id
router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('./movies/movie-details', movie))
        .catch(err => console.log(err))
})

//Delete a movie

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

//Edit a movie

router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .then(Celebrity.find())
        .then(movie => {
            Celebrity
                .find()
                .then(celebrities => res.render('./movies/edit-movie', { movie, celebrities }))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router;