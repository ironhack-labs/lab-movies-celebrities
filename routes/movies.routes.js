const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model');
const { query } = require("express");
const res = require("express/lib/response");
const req = require("express/lib/request");
const { findOneAndUpdate } = require("../models/Celebrity.model");
const { format } = require("express/lib/response");

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celeb => res.render('movies/new-movie', { celeb }))
        .catch(err => console.log(err))

})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(res.redirect('/movies/movies'))
        .catch(err => console.log(err))

})

router.get('/movies', (req, res) => {

    Movie
        .find()
        .populate('cast')
        .then(films => res.render('movies/movies', { films }))
        .catch(err => console.log(err))

})

router.get('/movies/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(film => res.render('movies/movie-details', film))
        .catch(err => console.log(err))

    

})

router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params
    console.log(`Deleting ${id}`)

    Movie
        .findByIdAndDelete(id)
        .then(res.redirect('/movies/movies'))
        .catch(err => console.log(err))

})

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    console.log(req.params)
    
    Movie
        .findById(id)
        .then((movie) =>{
           Celebrity
           .find()
               .then(cast => res.render('movies/edit-movie', {cast, movie}))
               .catch(err => console.log(err))
        })
        
        


})

router.post('/movies/:id/edit', (req, res) => {
    console.log(req.body, req.params)
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    
    
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(res.redirect(`/movies/movies/${id}`))   
        .catch(err => console.log(err)) 
        


})

module.exports = router;