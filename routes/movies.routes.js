// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
//require celebrities from the database for "cast" dropdown menu
const Celebrity = require("../models/Celebrity.model");

// Creating a movie 
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then(allCelebritiesFromDB => {
        res.render('movies/new-movie', {celebrities: allCelebritiesFromDB })
    })
    .catch(err => {console.log('There was an error retrieving the page from the server:', err)})
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
    .then(newSavedMovie => {
        res.redirect('/movies');
    })
    .catch(err => console.log("An error occurred while creating your movie", err))
});

// Listing movies
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(allMoviesFromDB => {
        res.render('movies/movies', { movies: allMoviesFromDB });
    })
    .catch(err => console.log('There was an error while retrieving your list of movies', err))
});

// Movie details routing
router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
    .then(movieDetail => {
        res.render('movies/movie-details', movieDetail);
    })
    .catch(err => console.log("There was an error while attempting to display movie details", err));
});

module.exports = router;
