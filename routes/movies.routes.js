// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


const { findOneAndUpdate } = require("../models/Celebrity.model");
const CelebrityModel = require("../models/Celebrity.model");
//require the movie model
const Movie = require('../models/Movie.model');

// all your routes here
//GET route to display form to create a celebrity
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((celebs) => {
        res.render('movies/new-movie.hbs', { celebs : celebs });
    })
    .catch(err => {
            res.render('celebrities/new-celebrity');
            console.log('Something went wrong while displaying movie-create view =>', err);
    });
});

//POST get all info about new celeb user submitted from the form. use this to create a new celeb in the database
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({title,genre,plot,cast})
      .then(dbMovie => res.redirect("/movies"))
      .catch((error) => res.render("movies/new-movie.hbs"));
});

//GET all movies and render the list
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(allMovies => {
        //console.log('Retrieved movies from DB:', allMovies);
        res.render('movies/movies', { movies : allMovies});
    })
    .catch(err => {
            console.log('Something went wrong while getting movies from DB =>', err);
        });
});

//GET route to render details about a specific movie
router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    console.log('This is the movie id =>', id)

    Movie.findById(id)
      //populate 'cast' its an array to get full data about the movie
      .populate('cast')
      .then(foundMovie => 
         res.render("movies/movie-details", { movie : foundMovie}))
    .catch((err) => {
          console.log(`Err while getting a single post from the  DB: ${err}`);
          next(err);
        });
});

//


module.exports = router;
