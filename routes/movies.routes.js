const express = require('express')
const router = express.Router()

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrity => {
            res.render('movies/new-movie', { celebrity })
        })
        .catch(err => console.log(err))

})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            //res.send('Funciono')
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

})

router.get('/movies', (req, res) => {

    Movie
        .find()
        .then(movies => {
            //console.log('Funciono')
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})

router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => {
            res.render('movies/movie-details', { movies })
        })
        .catch(err => console.log(err))
})

// no funciona
router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
    console.log('no quiero borrar')
        .catch(err => console.log(err))
})

// no funciona
router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(movie => {
            res.render('movies/edit-movie', movie)
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
})
module.exports = router