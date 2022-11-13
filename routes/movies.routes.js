// const express = require('express');
const router = require("express").Router();
const Movie = require('./../models/Movies.model')
const Celebrity = require('./../models/Celebrity.model');

router.get('/movies/create', (req, res, next) => {
    Celebrity
        .find()
        .then((celebritiesArray) => {
            const celebrities = {
                celebritiesArray
            }
            res.render('movies/new-movie', celebrities)
        })
        .catch(err => (err))
})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(() => {
            res.render('movies/new-movie')
        })
})

router.get('/movies', (req, res) => {
    Movie
        .find()
        .populate('cast')
        .then((moviesArray) => {
            const movies = {
                moviesArray
            }
            res.render("movies/movies", movies)
        })
        .catch(err => (err))
})

router.get('/movies/:movie_id/movie-details', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(moviesArray => {
            res.render('movies/movie-details', moviesArray)
        })
        .catch(err => (err))
})

router.get('/movies/:movie_id/update-movie', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(moviesArray => {
            Celebrity
                .find()
                .then(celebrities => {
                    res.render('movies/update-movie', { moviesArray, celebrities })
                    console.log({ moviesArray, celebrities })
                })
        })
        .catch(err => (err))
})

router.post('/movies/:movie_id/update-movie', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => (err))
})

router.post('/movies/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => (err))
})

module.exports = router;