// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express');
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movies.model')

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrity => res.render("movies/new_movie", { celebrity }))
        .catch(err => console.log(err))


})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))

})

router.get('/:movie_id/details', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))

})

router.post('/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log(err))

})

router.get('/:movie_id/edit', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(movie =>
            Celebrity
                .find()
                .then(celebrities => res.render('movies/edit-movie', { movie, celebrities })))
        .catch(err => console.log(err))


})

router.post('/:movie_id/edit', (req, res) => {
    const { movie_id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(movie => res.redirect(`/movies/${movie._id}/details`))
        .catch(err => console.log(err))
})

module.exports = router;