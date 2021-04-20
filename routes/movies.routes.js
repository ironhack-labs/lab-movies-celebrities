const express = require('express')
const CelebrityModel = require('../models/celebrity.model')
const MovieModel = require('../models/movie.model')
const router = express.Router()

router.get('/movies', (req, res) => {
    MovieModel.find()
    .then((result) => {
        res.render('movies/movies', {data: result})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/movies/new', (req, res) => {
    console.log('hello')
    CelebrityModel.find()
    .then((result) => {
        res.render('movies/new-movie', {data: result})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/movies/:_id', (req, res) => {
    MovieModel.findById(req.params._id)
    .then((result) => {
        res.render('movies/movie-details', result)
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/movies/create', (req, res) => {
    MovieModel.create(req.body)
    .then((result) => {
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log(err)
        res.render('movies/new-movie')
    })
})

router.post('/movies/:_id/delete', (req, res) => {
    console.log(req.params._id)
    MovieModel.findByIdAndDelete(req.params._id)
    .then((result) => {
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;
