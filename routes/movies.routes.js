const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/create', async (req, res) => {
    try {
        const celebs = await Celebrity.find()
        res.render('movies/new-movie', {celeb: celebs})
    } catch (err) {
        console.log(err);
    }
});

router.post('/create', async (req, res) => {
    try {
        const {title, genre, plot, cast} = req.body;
        const newMovie = await Movie.create({title, genre, plot, cast})
        res.redirect('/movies')
    } catch (err) {
        console.log(err);
    }
});









module.exports = router;