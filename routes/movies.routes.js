// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//Require Movie model
const Movie = require('../models/Movie.model.js')
//Require celebrity model
const Celebrity = require('../models/Celebrity.model.js')

// all your routes here
router.get('/movies/create', async (req,res) => {
    try{
        let allCelebritiesFromDb = await Celebrity.find()
        res.render('movies/new-movie.hbs', {celebrities: allCelebritiesFromDb})
    }
    catch(error){console.log(error)}
})

router.post('/movies/create', async (req,res)=>{
    try{
        const {title, genre, plot, cast} = req.body;
        await Movie.create({title, genre, plot, cast})
        res.redirect('/movies');
    }
    catch(error){
        console.log(error)
        res.render('movies/new-movie.hbs')
    }
})

//GET route to display all the movies in the Db
router.get('/movies', async (req,res) => {
    try{
        let allMoviesFromDb = await Movie.find();

        res.render('movies/movies.hbs', {movies: allMoviesFromDb})
    }
    catch(error){
        console.log(error)
    }
})

//GET route for movie details
router.get('/movies/:movieId', async (req, res) => {
    try{
        const {movieId} = req.params;

        let chosenMovie = await Movie.findById(movieId)
        
        await chosenMovie.populate('cast');

        res.render('movies/movie-details', {chosenMovie})
    }
    catch(error){console.log(error)}
})

//Delete
router.post('/movies/:movieId/delete', async (req, res) => {
    try{
        const {movieId} = req.params;
        await Movie.findByIdAndRemove(movieId);
        res.redirect('/movies')
    }
catch(error){console.log(error)}
});


//Update existing movie
router.get('/movies/:movieId/edit', async (req, res) => {
    try{
        const {movieId} = req.params;

        let chosenMovie = await Movie.findById(movieId)

        let allCelebritiesFromDb = await Celebrity.find()

        res.render('movies/edit-movie', {movie: chosenMovie, celebrities: allCelebritiesFromDb})

    }
    catch(error){
        console.log(error);
    }
})

router.post('/movies/:movieId/edit', async (req, res) => {
    try{
        const {movieId} = req.params;
        const {title, genre, plot, cast} = req.body;
        await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast}, {new: true});
        res.redirect(`/movies/${movieId}`);
    }
    catch(error){

    }
})



module.exports = router;