//jshint esversion:8
const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require("../models/Celebrity.model");
// all your routes here

/************************* CREATE MOVIE *****************************/

router.get('/movies/create', (req, res, next) =>  {
    Celebrity.find()
        .then(dbCelebrities => {
            res.render('movies/new-movie', {dbCelebrities});
        })
        .catch(err => {
            res.render('celebrities/new-celebrity');
            console.log('Something went wrong while displaying movie-create view', err);
        });
    
});

router.post('/movies/create', (req, res, next) =>  {

    const {title, genre, plot, cast} = req.body;
    //console.log(title, genre, plot, cast);

    Movie.create({title, genre, plot, cast})
        .then(dbMovie => {
            //console.log(dbMovie);
            res.redirect('/movies');
        })
        .catch(err => {
            console.log('Something went wrong while creating new movie', err);
        });
});

/************************* ALL MOVIES *****************************/

router.get('/movies', (req, res, next) =>  {
    Movie.find()
        .then(dbMovies => {
            console.log(dbMovies);
            res.render('movies/movies', {dbMovies});
        })
        .catch(err => {
            console.log('Something went wrong while getting movies from DB', err);
        });
    
});
module.exports = router;