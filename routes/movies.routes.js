const express = require('express');
const router = require("express").Router();
const Movie = require('./../models/Movies.model')

router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie')
});
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
    res.render('movies/movies')
})

module.exports = router;