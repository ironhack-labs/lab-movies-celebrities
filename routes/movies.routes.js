const express = require('express');
const router = express.Router();

const Celebrities = require('../models/Celebrity.model')
const Movies = require('../models/movies.model')

router.get('/movies/create', (req, res) => {
    res.render('movies/new-movie')
})

router.post('/movies/create', (req, res) => {


    const { name, genre, cast, plot } = req.body

    Movies
        .create(req.body)
        .then(movies => {
            console.log(movies)
            res.redirect('/movies')
        })
        .catch(err => res.redirect('/movies/create')
        )
})

router.get('/movies', (req, res) => {

    Movies
        .find()
        .then(moviesDb => {
            res.render('movies/movies', { moviesDb })
        })
        .catch(err => res.redirect('/movies'))
})

router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movies
        .findById(id)
        .populate('Celebrity')
        .then(movie => {
            console.log(movie)
            res.render('movies/movie-details', movie)
        })
        .catch(err => res.redirect('/movies'))


})



router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params


    Movies
        .findByIdAndUpdate(id)
        .then(movie => res.render('movies/movies-update', movie))
        .catch(err => res.redirect('/movies'))
})

router.post('/movies/:id/edit', (req, res) => {

    const { id } = req.params
    const { name, genre, plot, cast } = req.body

    Movies
        .findByIdAndUpdate(id, req.body)
        .then(movie => {
            res.redirect(`movies/movie-details`, movie)
        })
        .catch(err => res.redirect('/movies'))

})




router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movies
        .findByIdAndDelete(id)
        .then(movie => {
            res.redirect('/movies')
        })
        .catch(err => res.redirect('/movies')
        )


})






module.exports = router;