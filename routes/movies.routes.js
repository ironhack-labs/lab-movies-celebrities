const express = require('express')
const router = express.Router()
const MovieModel = require('../models/Movie.model')
const CelebrityModel = require('../models/Celebrity.model')

// lista de películas
router.get('/', (req, res, next) => {
    MovieModel.find()

        .then((movies) => {
            res.render('movies/movies', { movies })
        })
        .catch((err) => next(err))
})

// creación de películas
router.get('/create', (req, res, next) => {
    CelebrityModel.find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch((err) => next(err))
})

router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    MovieModel.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => next(err))
})

//detalles de películas
router.get('/:movie_id', (req, res, next) => {
    const { movie_id } = req.params

    MovieModel.findById(movie_id)
        .populate("cast")
        .then((movie) => {
            res.render('movies/movie-details', movie)
        })
        .catch((err) => next(err))
})

// Borrar películas
router.post('/:movie_id/delete', (req, res, next) => {
    const { movie_id } = req.params
    MovieModel.findByIdAndRemove(movie_id)
        .then(() => {
            res.redirect("/movies")
        })
        .catch((err) => next(err))
})

router.get('/:movie_id/edit', (req, res, next) => {
    const { movie_id } = req.params

    MovieModel.findById(movie_id)
        .populate("cast")
        .then((movie) => {
            CelebrityModel.find()
                .then((celebrities) => {
                    res.render('movies/edit-movie', { movie, celebrities })
                })
                .catch((err) => next(err))
        })
})

router.post('/:movie_id/edit', (req, res, next) => {
    const { movie_id } = req.params
    const { title, genre, plot, cast } = req.body

    MovieModel.findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => next(err))
})


module.exports = router