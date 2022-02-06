const router = require('express').Router()
const { redirect } = require('express/lib/response')
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')
const res = require('express/lib/response')


router.get("/crear", (req, res) => {

    Celebrity
        .find()
        .then((cel) => res.render('movies/new-movie', { cel }))
        .catch(err => console.log(err))
})

router.post("/crear", (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/peliculas'))
        .catch(err => console.log(err))
})

router.get("/", (req, res, next) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/detalles/:movie_id', (req, res) => {
    const { movie_id } = req.params
    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

router.post('/:movie_id/borrar', (req, res) => {
    const { movie_id } = req.params
    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/peliculas'))
        .catch(err => console.log(err))
})

router.get('/:movie_id/editar', (req, res) => {
    const { movie_id } = req.query

    Movie
        .findById(movie_id)
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))
})

router.post('/:movie_id/editar', (req, res) => {

    const { movie_id } = req.query
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast }, { new: true })
        .then(() => res.redirect('/peliculas'))
        .catch(err => console.log(err))
})

module.exports = router