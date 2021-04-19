const express = require('express')
const router = express.Router()

const Movie = require('../models/movie')

router.get('/movies/new', (req, res) => {
    res.render('movies/new-movie')
})

router.post('/movies/create', (req, res) => {
    const {title, genre, plot} = req.body
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



module.exports = router