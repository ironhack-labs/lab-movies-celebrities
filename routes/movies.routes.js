const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .then((celebritiesFromDB) => {
            const celebritiesArray = {
                celebritiesFromDB
            }
            res.render('movies/new-movie', celebritiesArray)
        })
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then((moviesFromDB) => {
            const moviesArray = {
                moviesFromDB
            }
            res.render('movies/movies', moviesArray)
        })
        .catch(err => console.log(err))
})

router.get('/movies/:movie_id/movie-details', (req, res, next) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(moviesFromDB => {
            res.render('movies/movie-details', moviesFromDB)
        })
        .catch(err => console.log(err))
})

router.post('/movies/:movie_id/delete', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndRemove(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:movie_id/edit-movie', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(moviesFromDB => {

            Celebrity
                .find()
                .then(celebritiesArray => {
                    res.render('movies/edit-movie', { moviesFromDB, celebritiesArray })
                })
        })
        .catch(err => console.log(err))
})

router.post('/movies/:movie_id/edit-movie', (req, res) => {

    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router;