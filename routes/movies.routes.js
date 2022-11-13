const express = require('express');
const router = express.Router();

const MovieModel = require('../models/Movie.model')

router.get('/movies/create', (req, res, next) => {

    MovieModel
        .find()
        .populate('cast')
        .then(movieFromDB => {
            console.log('formulario nuevas pelis cargado')
            res.render('movies/new-movie', { movies: movieFromDB })
        })
        .catch(err => console.log(err))

});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    MovieModel
        .create({ title, genre, plot, cast })
        .then(MovieModel => {
            console.log('peli creada')
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err)
            res.redirect('movies/new-movie')
        })
});
router.get('/movies', (req, res, next) => {

    MovieModel
        .find()
        .then(moviesFromDB => {
            res.render('movies/movies', { movies: moviesFromDB })
        })
        .catch(err => console.log(err))
});

router.get('/movies/details/:movie_id', (req, res) => {

    const { movie_id } = req.params

    MovieModel
        .findById(movie_id)
        .populate('cast')
        .then(movieFromDB => {
            res.render('movies/details', movieFromDB)
        })
        .catch(err => console.log(err))
})


module.exports = router;