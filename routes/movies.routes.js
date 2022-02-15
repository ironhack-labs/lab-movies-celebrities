const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/create', async (req, res) => {
    try {
        const celebs = await Celebrity.find()
        res.render('movies/new-movie', {celeb: celebs})
    } catch (error) {
        console.log(error);
    }
});

router.post('/create', async (req, res) => {
    try {
        const {title, genre, plot, cast} = req.body;
        const newMovie = await Movie.create({title, genre, plot, cast})
        res.redirect('/movies')
    } catch (error) {
        console.log(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const allMovies = await Movie.find();
        res.render('movies/movies', {movies: allMovies});
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const theMovie = await Movie.findById(id).populate('cast');
        res.render('movies/movie-details', {movie: theMovie});
    } catch (error) {
        console.log(error);
    }
});

router.post('/:id/delete', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedMovie = await Movie.findByIdAndRemove(id);
        res.redirect('/movies');
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const {id} = req.params;
        const selectedMovie = await Movie.findById(id).populate('cast');
        const celebs = await Celebrity.find()
        res.render('movies/edit-movie', {movie: selectedMovie, celeb: celebs})
    } catch (error) {
        console.log(error);
    }
});

router.post('/:id/edit', async (req, res) => {
    try {
        const {title, genre, plot, cast} = req.body;
        const {id} = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id, {title, genre, plot, cast});
        res.redirect('/movies')
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;