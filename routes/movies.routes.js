// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const router = require("express").Router();

router.get('/movies/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('movies/new-movie', { celebrities });
    } catch (error) {
        console.log(error);
    }

});

router.post('/movies/create', async (req, res, next) => {
    try {
        const { title, genre, plot, cast } = req.body;

        const createdMovie = await Movie.create({ title, genre, plot, cast });

        res.redirect('/movies');

    } catch (error) {
        res.redirect('/movies/new-movie')
        console.log(error);
        next(error);
    };
});

router.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', { movies });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;