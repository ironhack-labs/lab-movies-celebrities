const express = require('express');
const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/movies', (req, res, next) => {

    Movie
    .find()
    .then(movie => res.render('movies/movies', {movie}))
    .catch(err => console.log(err))

});

router.get('/movies/create', (req, res, next) => {
    
    const { id } = req.params

    Celebrity
    .findById(id)
    .populate('cast')
    .then(movie => res.render('movies/new-movie', {movie}))
    .catch(err => console.log(err))

});

router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast, poster } = req.body

    Movie
    .create({ title, genre, plot, cast, poster })
    .then(movie => res.redirect('/movies'))
    .catch(err => console.log(err))

});

router.get('/movies/:id/edit', (req, res, next) => {
  
    const { id } = req.params

    Movie
    .findById(id)
    .then(movie => res.render('movies/edit-movie', movie))
    .catch(err => console.log(err))

});

router.post('/movies/:id/edit', (req, res, next) => {
  
    const { title, genre, plot, cast, poster } = req.body
    const { id } = req.params

    Movie
    .findByIdAndUpdate(id, { title, genre, plot, cast, poster })
    .then(movies => res.redirect('/movies'))
    .catch(err => console.log(err))

});

router.get('/movies/:id/details', (req, res, next) => {

    const { id } = req.params
    
    Movie
    .findById(id)
    .then(movie => res.render('movies/movie-details', {movie: movie}))
    .catch(err => console.log(err))

});

router.post('/movies/:id/delete', (req, res, next) => {

    const { id } = req.params

    Movie
    .findByIdAndDelete(id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))

});
module.exports = router;
