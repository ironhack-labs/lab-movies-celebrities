const express = require('express')
const router = express.Router()

const Movie = require('../models/movie')
const Celebrity = require('../models/celebrity')

router.get('/movies/new', (req, res) => {
    Celebrity.find()
    .then((result)=>{
    res.render('movies/new-movie', {celeb: result})
    })
    .catch((error)=>{
    console.log(error)
    })
    
})

router.post('/movies/create', (req, res) => {
    const {title, genre, plot, cast} = req.body
    Movie.create(req.body)
        .then((result) => {
            console.log(result)
            res.redirect('/movies')
        })
        .catch((error) => {
            console.log(error)
            res.render('/movies/new-movie')
        })
})

router.get('/movies', (req, res)=>{
    Movie.find({})
    .then((result)=>{
    console.log(result)
    res.render('movies/movies', {data: result})
    })
    .catch((error)=>{
    console.log(error)
    })
    
})

router.get('/movies/:_id', (req, res)=>{
    Movie.findById(req.params)
    .populate('cast')
   .then((result)=>{
    console.log(result)
    res.render('movies/movie-details', {movie: result})
   })
   .catch((error)=>{
   console.log(error)
   })
   
})

module.exports = router