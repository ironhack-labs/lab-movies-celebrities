const express = require('express')
const Celebritie = require('../models/Celebrity.model')
const Movie = require('../models/movie.model')
const router = express.Router()



router.get('/create/movie', (req, res, next)=>{
    Celebritie
    .find()
    .then(celebrities => res.render('movies/new-movie', {celebrities}))
    .catch(err => console.log(err))
    
})

router.post('/create/movie', (req, res, next) =>{
    const {title, genre, plot, cast} = req.body

    Movie
    .create({title, genre, plot, cast})
    .then(()=> res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get ('/movies', (req, res, next) => {
    Movie
    .find()
    .then(movies => res.render('movies/movies', {movies}))
    .catch(err => console.log(err))
})

router.get('/movies/:id', (req, res, next) =>{
    const _id = req.params

    Movie
    .findById(_id.id)
    .populate('cast')
    .then(movie => res.render ('movies/movie-details', movie))
    .catch(err =>console.log(err))
})

router.post('/movies/:id/delete', (req, res, next) => {

    const _id = req.params

    Movie
    .findByIdAndDelete(_id.id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res, next) => {
    const _id = req.params
Movie
.findById(_id.id)
.populate('cast')
.then(movie => res.render('movies/edit-movie', movie))
.catch(err => console.log(err))



})

router.post ('/movies/:id/edit', (req, res, next) => {
    const _id = req.params
    const {title, genre, plot, cast} = req.body

    Movie

    .findByIdAndUpdate(_id.id, {title, genre, plot, cast})
    .then(updatedMovie => res.redirect('/movies'))
    .catch(err=> console.log(err))
})



module.exports = router