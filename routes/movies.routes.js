// starter code in both routes/celebrities.routes.js and routes / movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))

})

router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:id', (req, res, next) => {

    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movieDetail => res.render('movies/movie-details', movieDetail))
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res, next) => {

    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res, next) => {

    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movieEdit => res.render('movies/edit-movie', movieEdit))
        .catch(err => console.log(err))
})

router.post('/movies/:id/edit', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(err => console.log(err))

})

module.exports = router;