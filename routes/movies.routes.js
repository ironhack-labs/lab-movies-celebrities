const express = require("express")
const Celebrity = require("../models/Celebrity.model")
const router = express.Router()

const Movie = require('../models/Movie.model')

/* MOVIES */
router.get("/movies" , (req, res) => {
    Movie.find({})
    .then(result => {
        res.render('movies/movies', {movies: result})
    })
    .catch(error => {
    console.log(error)
    })   
})

router.get("/movies/new", (req, res, next) => {
    Celebrity.find({})
    .then(result => {
        res.render("movies/new-movie", {celebrities: result})
    })
    .catch(error => {
    console.log(error)
    })
});

router.post("/movies/create", (req, res, next) => {
    Movie.create(req.body)
        .then(result => {
            res.redirect('/movies')
        })
        .catch(error => {
            res.render("celebrities/new-movie")
        })  
})

router.get('/movies/:_id', (req, res) => {
    Movie.findById(req.params._id)
        .populate('cast')
        .then(result => {
            res.render('movies/movie-details', result)
        })
        .catch(error => {
            console.log(error)
        })  
})

router.post('/movies/:_id/delete', (req, res) => {
    console.log(req.params._id)
    Movie.findByIdAndDelete(req.params._id)
        .then(result => {
            res.redirect('/movies')
        })
        .catch(error => {
            console.log(error)
        })       
})

router.get('/movies/:_id/edit', (req, res)=>{
    Movie.findById(req.params._id)
        .populate('cast')
        .then(result => {
            Celebrity.find({})
            .then((result2)=>{
                res.render('movies/edit-movie', {movie: result, celebrities: result2})
            })  
        })
        .catch(error => {
            console.log(error)
        })
})

router.post('/movies/:_id', (req, res)=>{
    Movie.findByIdAndUpdate(req.params._id, req.body)
        .then(result => {
            res.redirect('/movies/'+result._id)
        })
        .catch(error => {
            console.log(error)
        })
})

module.exports = router;