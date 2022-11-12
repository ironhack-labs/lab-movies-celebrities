const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then(Movie => {
            res.render('movies/movies', { Movie })
        })
        .catch(err => console.log(err))
})

router.get('/movies/create', (req, res, next) => {

    Movie
        .find()
        .then(movie => {
            res.render('movies/new-movie', { movie })
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

router.get('/movies/:id', (req, res, next) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(() => {
            res.render('movies/movie-details')
        })
        .catch(err => console.log(err))
})

module.exports = router;