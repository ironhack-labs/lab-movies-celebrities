const router = require("express").Router();
const Movie = require('../models/Movie.model.js');
const Celebrity = require('../models/Celebrity.model.js');


router.get('/movies/create', async(req,res)=>{
    try{
        let allCelebritiesFromDb = await Celebrity.find();
        res.render('movies/new-movie.hbs', {celebrities: allCelebritiesFromDb});
    }
    catch(error){
        console.log(error)
    }
});

router.post('/movies/create', async(req,res)=>{
    try{
        const {title, genre, plot, cast} = req.body;
        await Movie.create({title, genre, plot, cast});
        res.redirect('/movies')
    }
    catch(error){
        res.render('movies/new-movies')
        console.log(error);
    }
});

router.get('/movies', async(req,res)=>{
    try{
        let allMoviesFromDb = await Movie.find();
        res.render('movies/movies.hbs', {movies: allMoviesFromDb});
    }
    catch(error){
        console.log(error);
    }
});

router.get('/movies/:movieId', async(req,res)=>{
    try{
        const {movieId} = req.params;
        let foundMovie = await Movie.findById(movieId);
        const celebrities = await Celebrity.find();
        await foundMovie.populate('cast');
        res.render('movies/movie-details.hbs', {movie: foundMovie, celebrities});
    }
    catch(error){
        console.log(error);
    }
});

router.post('/movies/:movieId/delete', async(req,res)=>{
    const{movieId} = req.params;
    try{
        await Movie.findByIdAndRemove(movieId);
        res.redirect('/movies');
    }
    catch(error){
        console.log(error);
    }
});

router.get('/movies/:movieId/edit', async(req,res)=>{
    const {movieId} = req.params;
    try{
        let foundMovie = await Movie.findById(movieId);
        let allCelebrities = await Celebrity.find();
        res.render('movies/edit-movie.hbs', {celebrities: allCelebrities, movie: foundMovie});
    }
    catch(error){
        console.log(error);
    }
});

router.post('/movies/:movieId/edit', async(req,res)=>{
    const {movieId} = req.params;
    const {title, genre, plot, cast} = req.body;
    try{
        await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast}, {new: true});
        res.redirect(`/movies/${movieId}`)
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router;