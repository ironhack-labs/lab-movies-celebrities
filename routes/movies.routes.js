const router = require("express").Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


// Movies Lists
router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .populate('cast', 'name')
        .sort({ title: 1 })
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})


// Movie Details
router.get('/movies/:_id/details', (req, res, next) => {

    const { _id } = req.params

    Movie
        .findById(_id)
        .populate({
            path: 'cast',
            select: '-_id name'
        })
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))

})


// Movie Creation
router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(celebrities => res.render('movies/new-movie.hbs', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .populate('cast')
        .then(() => res.redirect('/movies'))
        .catch(err => res.redirect('/movies/new-movie'))
})


// Movie Edition
// Cambia los valores, excepto el cast, xo no renderiza con los nuevos valores

router.get('/movies/:_id/edit', (req, res, next) => {

    const { _id } = req.params

    Movie
        .findById(_id)
        .populate('cast', 'name')
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))
})

router.post('/movies/:_id/edit', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    const { _id } = req.params

    Movie
        .findByIdAndUpdate(_id, { title, genre, plot, cast })
        .populate('cast', 'name')
        .then(movie => res.render(`movies/movie-details`, movie))
        .catch(err => console.log(err))
})


// Movie delete
router.post('/movies/:_id/delete', (req, res, next) => {

    const { _id } = req.params

    Movie
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})


module.exports = router