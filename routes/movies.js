// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get('/movies/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('movies/new-movie', {celebrities});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('movies/create', async (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    
    try {
        const createdMovie = await Movie.create({title, genre, plot, cast});
        res.redirect('/movies');
    } catch (error) {
        res.render('movies/new-movie');
        console.log(error); 
    }
});

// List all movies

router.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', {movies});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/movies/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        const movie = await Movie.findById(id).populate('cast');
        res.render('movies/movie-detail', {movie});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/movies/:id/delete', async (req, res, next) => {
    const { id } = req.params;

    try {
        await Movie.findByIdAndRemove(id);

        res.redirect('/movies')

    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;