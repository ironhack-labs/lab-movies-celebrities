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

//CREATE MOVIE
router.post('/movies/create', (req, res) => {


    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})

//LIST MOVIE
router.get('/movies', (req, res) => {


    Movie
        .find()
        .then(movie => {
            res.render('movies/movies', { movie })

        })
        .catch(err => console.log(err))
})


//DETAIL MOVIE BY ID
router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {

            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))

})


//DELETE MOVIE
router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})

//EDIT MOVIE
router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(editMovie => res.render('movies/edit-movie', editMovie))
        .catch(err => console.log(err))

})


router.post('/movies/:id/edit', (req, res) => {

    const { title, genre, plot } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot })
        // .find(Celebrity, console.log("---------", Celebrity))
        .then(res.redirect('/movies'))
        .catch(err => console.log(err))
})




module.exports = router