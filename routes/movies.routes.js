const express = require('express');
const router = express.Router();

const MovieModel = require('../models/Movie.model')
const CelebrityModel = require('../models/Celebrity.model')


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
})

router.get('/movies', (req, res, next) => {
    res.render('movies/movies')
});


module.exports = router;