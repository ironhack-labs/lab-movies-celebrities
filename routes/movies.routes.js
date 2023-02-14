// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

const Movie = require('../models/Movie.model');

// add new movie

router.get('/movies/new-movie', async (req, res, next) => {
    try {
        let celebrities = await Celebrity.find();

        res.render('movies/new-movie', {celebrities})

    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.post('/movies/new-movie', async (req, res, next) => {
    try {
        const {title, genre, plot, cast} = req.body;

        await Movie.create({title, genre, plot, cast});

        res.redirect('/movies');
    } catch (error) {
        console.log(error);
        next(error);
    }
})

// get all movies
router.get('/movies', async (req, res, next) => {
    try {
        let movies = await Movie.find();

        res.render('movies/movies', {movies})

    } catch (error) {
        console.log(error);
        next(error);
    }
})

// get details
router.get('/movies/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const movie = await Movie.findById(id).populate('cast');

        const celebrities = await Celebrity.find();

        res.render('movies/movie-details', {movie, celebrities});

    } catch (error) {
        console.log(error);
        next(error);
    }
})

// delete a movie

router.post('/movies/:id/delete', async (req, res, next) => {
    try {
        const {id} = req.params;

        await Movie.findByIdAndRemove(id);

        res.redirect('/movies');

    } catch (error) {
        console.log(error);
        next(error); 
    }
})

// edit a movie

router.get('/movies/:id/edit', async (req, res, next) => {
    try {
        const {id} = req.params;

        const movie = await Movie.findById(id);

        const celebrities = await Celebrity.find();

        res.render('movies/edit-movie', {movie, celebrities})

    } catch (error) {
        console.log(error);
        next(error); 
    }
})

router.post('/movies/:id/edit', async (req, res, next) => {
    try {
        const {id} = req.params;

        const {title, genre, plot, cast} = req.body;

        await Movie.findByIdAndUpdate(id, {title, genre, plot, cast});

        res.redirect(`/movies/${id}/edit`);

    } catch (error) {
        console.log(error);
        next(error); 
    }
})





module.exports = router;