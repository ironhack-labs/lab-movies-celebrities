const express = require('express');
const router = require("express").Router();

const Movie = require('./../models/Movie.model.js')
const Celebrity = require('./../models/Celebrity.model.js')

router.get('/movies/create/', (req, res) => {

    Celebrity
        .find()
        .then((celebrity) => {
            res.render('movies/new-movie', { celebrity });
        })

});

router.post('/movies/create', (req, res) => {


    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})


router.get('/movies', (req, res) => {


    Movie
        .find()
        .then(movie => {
            res.render('movies/movies', { movie })

        })
        .catch(err => console.log(err))
})


router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movieData => {
            res.render('movies/movie-details', movieData)
        })
        .catch(err => console.log(err))
})

module.exports = router