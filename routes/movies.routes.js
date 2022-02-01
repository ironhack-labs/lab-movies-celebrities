// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const res = require("express/lib/response");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get('/movies', (req,res,next) => {
    Movie.find()
    .then(dbList => res.render('movies/movies.hbs', {movie: dbList}))
    .catch(err => console.log('Error while retrieving movies list: ', err))
});

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then(dbList => res.render('movies/new-movie.hbs', {celebrity: dbList}))
    .catch(err => console.log('Error retrieving celebrities list: ', err))
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast})
    .then(() => res.redirect('/movies'))
    .catch(err => res.render("movies/create"))
});

router.get('/movies/:movieId', (req, res, next) => { //make sure res and req are right way round!!!
    const { movieId } = req.params;

    Movie.findById(movieId)
    .populate('cast')
    .then(movieDetails => res.render('movies/movie-details.hbs', {movie: movieDetails}))
    .catch(err => console.log('Error while retrieving movie details: ', err))
});

module.exports = router;

router.post('/movies/:movieId/delete', (req, res, next) => {
    const { movieId } = req.params;

    Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log('Error while delteing movie: ', err))
});

router.get('/movies/:movieId/edit', (req,res,next) => {
    const { movieId } = req.params; 

    Movie.findById(movieId)
    .populate('cast') //needs a way to get the full cast so not sure this is the right way
    .then(movieDetails => res.render('movies/edit-movie', {movie: movieDetails}))
    .catch(err => console.log('Error when retrieiving details for update', err))
});


router.post('/movies/:movieId/edit', (req,res,next) => {
    const{ movieId } = req.params;
    const {title, genre, cast, plot} = req.body;

    Movie.findByIdAndUpdate(movieId, {title, genre, cast, plot})
    .then(() => res.redirect('/movies'))
    .catch(err => console.log('Error when updating movie details: ', err))
});
