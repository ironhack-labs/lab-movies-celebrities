const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/create', (req, res, next) => {

    Celebrity
        .find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => next(err))
})

router.post('/create', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(newMovie => res.redirect('/movies'))
        .catch(err => next(err))
})

router.get('/', (req, res, next) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => next(err))
})

router.get('/:movieId', (req, res, next) => {
    const { movieId } = req.params

    Movie
        .findById(movieId)
        .populate('cast')
        .then((movie) => res.render('movies/movie-details', movie))
        .catch(err => next(err))
})

router.post('/:movieId/delete', (req, res, next) => {
    const { movieId } = req.params

    Movie
        .findByIdAndRemove(movieId)
        .then(() => res.redirect('/movies'))
        .catch(err => next(err))
})

router.get('/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params

    Promise.all([
        Movie.findById(movieId),
        Celebrity.find()
    ])
        .then(([movie, celebrities]) => res.render('movies/edit-movie', { movie, celebrities }))
        .catch(err => next(err))
})

router.post('/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
        .then((updatedMovie) => res.redirect(`/movies/${updatedMovie._id}`))
        .catch(err => next(err))
})

module.exports = router