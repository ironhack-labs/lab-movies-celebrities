const express = require('express')
const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

// Movies List
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .sort({ title: 1 })
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))

})

// Create new Movies
router.get('/movies/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, imageUrl, cast } = req.body
    Movie
        .create({ title, genre, plot, imageUrl, cast })
        .then(newMovie => res.redirect('/movies'))
        .catch(err => console.log(err))
})

// Movies Details

router.get('/movies/:id', (req, res, next) => {

    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

// Delete Movies
router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

//Update Movies


router.get('/movies/:id/edit', async (req, res) => {
    const { id } = req.params
    try {
        const celebrities = await Celebrity.find()
        const movie = await Movie.findById(id).populate('cast')
        res.render('movies/edit-movie', { celebrities, movie })
    } catch (error) {
        console.error('Error al obtener los modelos', error)
    }
})

router.post('/movies/:id/edit', (req, res, next) => {
    const { title, genre, plot, imageUrl, cast } = req.body
    const { id } = req.params
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, imageUrl, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router