
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Movie = require("../models/Movie.model");

const Celeb = require('../models/Celeb.model')

const router = require("express").Router();

// all your routes here

router.get('/movies/create', (req, res, next) => {
    Celeb.find()
    .then((allCelebs)=>{
        console.log(allCelebs)
        res.render('movies/new-movie', {allCelebs})
    })
})


router.post('/movies/create', (req, res, next) => {
    console.log(req.body)
    const {title, genre, plot, cast} = req.body
    Movie.create({title:title, genre:genre, plot:plot, cast:cast})
    .then(()=> {
        res.redirect('/movies')
    })
    .catch((err)=> {
        res.render('movies/new-movie')
        console.log('The error while creating is: ', err)
    })
})

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((result) => {
        console.log(result)
        res.render('movies/movies', {result})
    }) 
})

router.get('/movies/:movieId', (req,res,next) =>{
    Movie.findById(req.params.movieId)
    .populate('cast')
    .then((result)=>{
        res.render('movies/movie-details', result)
    })
    .catch((err)=> {
        console.log('The error while rendering movie-details is, ', err)
    })
})

router.post('/movies/:movieId/delete', (req, res, next) => {
    console.log(req.params.movieId)
    Movie.findByIdAndRemove(req.params.movieId)
    .then(() => {
        res.redirect('/movies')
    })
    .catch((err)=> {
        console.log('The error while deleting the movie-details page is, ', err)
    })
})

module.exports = router;