const router = require('express').Router();
const Celeb = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/movies/create', async (req, res, next) => {
try {
    
    const celebsList = await Celeb.find();
    res.render('movies/new-movie', {celebsList})
} catch (error) {
    console.log(error);
    next(error);
}
   
});

router.post('/movies/create', async (req, res, next) => {

    try {
        const {title, genre, plot, cast} = req.body;
        await Movie.create({title, genre, plot, cast})
        res.redirect('/movies')
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/movies', async (req, res, next) => {

    try {

        const moviesList = await Movie.find();
        res.render('movies/movies', {moviesList});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.post('/movies/:id/delete', async (req, res, next) => {

    try {
        const {id} = req.params;
        await Movie.findByIdAndRemove(id);
        console.log(`Movie ID: ${id}`);
        res.redirect('/movies')
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.get('/movies/:id/edit', async (req, res, next) => {

    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        const celebsList = await Celeb.find();

        res.render('movies/edit-movie', {movie, celebsList});
    } catch (error) {
        console.log(error);
        next(error);
        
    }
});

router.post('/movies/:id/edit', async (req, res, next) => {

    try {
        const {id} = req.params;
        const {title, genre, plot, cast} = req.body;
        await Movie.findByIdAndUpdate(id , {title, genre, plot, cast});
        res.redirect(`/movies/${id}`)

    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.get('/movies/:id', async (req, res, next) => {

    try {
        const {id} = req.params;
        const movie = await Movie.findById(id).populate('cast');
        res.render('movies/movie-details', movie )
        
    } catch (error) {
        console.log(error);
        next(error);

    }
});














module.exports = router;