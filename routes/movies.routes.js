// Iteration 1
const router = require("express").Router();

// Requiring models
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// Iteration 6 - Adding New Movies
router.get('/movies/create', async (req,res) => {
    const getCast = await Celebrity.find();
    res.render('movies/new-movie.hbs', {getCast})
});

router.post('/movies/create', async (req,res) => {
    try{
        const {title, genre, plot, cast} = req.body;
    
        await Movie.create({title, genre, plot, cast});
        res.redirect('/movies');
    }
    catch (error){
        cosole.log(error);
    }
});

// Iteration 7 - GET route to display all the movies
router.get('/movies', async(req,res) => {
    try{
        // get all movies from Database via .find() method
        let allMovies = await Movie.find();

        res.render('movies/movies.hbs', {movies: allMovies});
    }
    catch(error) {
        console.log(error);
    }
});


// Iteration 8
router.get('/movies/:id', async (req,res) => {
    try{
        const {id} = req.params;
        let foundMovie = await Movie.findById(id).populate("cast");
        res.render("movies/movie-details.hbs", {foundMovie});
    }catch (error){
        console.log(error)
    }
});


// Iteration 9
router.post('/movies/:id/delete', async (req,res) => {
    try{
        const {movieId} = req.params;
        await Movie.findByIdAndRemove(movieId);
        
        res.redirect('/movies');
    }
    catch (error){
        console.log(error)
    }
});


// Iteration 10
router.get('/movies/:id/edit', async (req,res) => {
    try {
        const {movieId} = req.params;
        let editMovie = await Movie.findById(movieId);

        res.render('movies/edit-movie', {editMovie});
    }
    catch(error){
        console.log(error);
    }
});

router.post('/movies/:id', async (req,res) => {
    try{
        const {movieId} = req.params;
        const {title, genre, plot, cast} = req.body;

        await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast});

        res.redirect('/movies');
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;