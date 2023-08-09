const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// GET to create a new movie
router.get('/movies/create', async (req,res)=>{

    try{
    const castList = await CelebrityModel.find();
    res.render('movies/new-movie.hbs',{cast: castList});
    }
    catch(error){
        console.log(error)
    }
});

// POST to create a new movie
router.post('/movies/create', async (req,res)=>{

    const {title, genre, plot, cast} = req.body;

    try{

        const createMovie = await MovieModel.create({title, genre, plot, cast});
        res.redirect('/movies');
    }
    catch(error){
        console.log(error)
        res.render ('movies/new-movie.hbs');
    }
});

// GET to show list of all movies
router.get('/movies', async (req, res)=>{
    try{

        const movieList = await MovieModel.find();
        res.render('movies/movies.hbs', {movie: movieList});
    }
    catch(error){
        console.log(error)
    }
});

// GET to show details of specific movie
router.get('/movies/:movieId', async (req, res)=>{
    const {movieId} = req.params;

    try{
        const findMovie = await MovieModel.findById(movieId);
        await findMovie.populate( 'cast');

        res.render('movies/movie-details.hbs', {movie: findMovie});
    }
    catch(error){
        console.log(error)
    }
});

// POST to delete specific movie
router.post('/movies/:movieId/delete', async (req, res)=>{

    const {movieId} = req.params;
    try{

        await MovieModel.findByIdAndRemove(movieId);
        res.redirect('/movies');

    }
    catch(error){
        console.log(error)
    }

});

// GET to show page to edit specific movie
router.get('/movies/:movieId/edit', async (req, res, next)=>{

    const {movieId} = req.params;
    try{

        let findMovie = await MovieModel.findById(movieId);
        let celebrityList = await CelebrityModel.find();

        res.render('movies/edit-movie', {findMovie, celebrityList});

    }
    catch(error){
        console.log(error)
    }

});

// POST to update the edits made in the edit page of a specific movie
router.post('/movies/:movieId/edit', async (req, res, next)=>{

    const {movieId} = req.params;
    const {title, genre, plot, cast} = req.body;
    try{

        let updateMovie = await MovieModel.findByIdAndUpdate(movieId, {title, genre, plot, cast});

        res.redirect(`/movies/${movieId}`)
    }
    catch(error){
        console.log(error)
    }

});

module.exports = router;