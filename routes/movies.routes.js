const express = require('express')
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


// Show Movies
router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .sort({ title: 1 })
        .then(moviesFromDB => {
            res.render('movies/movies', { moviesFromDB })
        })
        .catch(err => console.log(err))

})


// Create movie (render)
router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(celebritiesFromDB => {
            res.render('movies/new-movie', { celebritiesFromDB })
        })
        .catch(err => console.log(err))

})


// Create movie (handler)
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

})


// Movies details (render)
router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))

})


//Edit Movie (render)
router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            return movie
        })
        .then(movie => {
            Celebrity
                .find()
                .sort({ name: 1 })
                .then(celebritiesFromDB => {
                    // res.send({ movie, celebritiesFromDB })
                    return res.render('movies/edit-movie', { movie, celebritiesFromDB })
                })
        })
        .catch(err => console.log(err))

})


//Edit Movie (handler)
router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect(`/movies/${id}`)
        })
        .catch(err => console.log(err))

})


//Delete Movie
router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

})


module.exports = router;