// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// ---------- MOVIES routes here

// Create Movie
router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie-page', { celebrities }))
        .catch(err => console.log('Oh! An error occurred when finding the celebrities', err))
})

router.post('/movies/create', (req, res, next) => {

    const { cast, title, genre, plot } = req.body

    Movie
        .create({ cast, title, genre, plot })
        .then(() => res.redirect('/movies'))
        .catch(err => {
            console.log('Oh! An error occurred when creating the movies', err)
            res.render('movies/new-movie-page')
        })
})

// Movies List
router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .populate('cast')
        .then(movies => {
            res.render('movies/movies-page', { movies })
        })
        .catch(err => console.log('Oh! An error occurred when listing all celebrities', err))
})

// Movie details
router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details-page', movie)
        })
        .catch(err => console.log('Oh! An error occurred when showing movie details', err))
})

// Delete movies
router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log('Oh! An error occurred when deleting a movie', err))
})

// Update movies
router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params

    Movie
        .findById(id)
        //.populate('cast')
        .then(movieToEdit => {
            Celebrity
                .find()
                .then(celebs => {
                    console.log(movieToEdit)
                    res.render('movies/edit-movie-page', { movieToEdit, celebs })
                })
                .catch(err => console.log(err))
        })
})

router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(err => console.log(err))
})


module.exports = router;