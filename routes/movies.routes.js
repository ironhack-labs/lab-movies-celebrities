const app = require("../app");

// // starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model');

// ------ Routes ------- //

// Create Movie

router.get('/movies/create', (req, res) => {

    Celebrity.find()
    .then((allCelebs)=> {

        res.render('movies/new-movie', {celebs: allCelebs})

    })
    
});

router.post('/movies/create', (req, res, next) => {

const {title, genre, plot, cast} = req.body;

Movie.create({title, genre, plot, cast})
.then(() => {

    res.redirect('/movies');

})
.catch((err) => next(err));

})


// Movie List 

router.get('/movies', (req, res, next) => {

Movie.find()
.then((allMovies) => {

    res.render('movies/movies', {movies: allMovies})
})
.catch((err) => next(err));


})


// Movie Details

router.get('/movies/:id', (req, res, next) => {

    const {id} = req.params;

    Movie.findById(id)
    .populate('cast')
    .then((foundMovie) => {
    
        res.render('movies/movie-details', {movie: foundMovie})
    
    })
    .catch((err) => next(err));

})


// Delete Movies

router.post('/movies/:id/delete', (req, res, next) => {

    const {id} = req.params;

    Movie.findByIdAndDelete(id)
    .then(() => {

        res.redirect('/movies');

})
    .catch((err) => next(err));

})


// Edit Movies

router.get('/movies/:id/edit', (req, res, next) => {

    const {id} = req.params;

    Movie.findById(id)
    .populate('cast')
    .then((foundMovie) => {

        Celebrity.find()
        .then((allCelebs) => {

            res.render('movies/edit-movie', {movie: foundMovie, celebs: allCelebs})

        })

    })

    .catch((err) => next(err));
    
})

router.post('/movies/:id/edit', (req, res, next) => {

    const {id} = req.params;
    const {title, genre, plot, cast} = req.body;

    Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
    .then(()=> {
        res.redirect('/movies')
    })
    .catch((err) => next(err));

})


module.exports = router;