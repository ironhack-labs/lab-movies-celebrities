const express = require('express');
const router = express.Router();

const Movie = require('../models/movie.model')
const Celebrity = require('../models/celebrity.model')

//add new movie
router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDb) => res.render('movies/new-movie.hbs', { celebritiesFromDb }))
    .catch((err) => console.log(`Error while displaying the form to create a new movie: ${err}`));
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
    .then(res.redirect('/movies'))
    .catch((err) => console.log(`There was an error saving the Movie: ${err}`));
    res.redirect('back')
});

router.get('/movies', (req, res, next) => {
    Movie.find()
    .populate('cast', 'name -_id')
    .then((moviesFromDB) => 
        res.render('movies/movies.hbs', { moviesFromDB })
)
    .catch((err) => 
        console.log(`There was an error retrieving the movies: ${err}`));
});

//display Movie Details
router.get('/movies/:movieId', (req, res, next) => {

    Movie.findById(req.params.movieId)
    .populate('cast', 'name -_id')
    .then((foundMovie) => {
    res.render("movies/movie-details.hbs", { foundMovie });
    })
    .catch((err) => console.log(`Error while getting the movie details from DB: ${err}`));
});

module.exports = router;
