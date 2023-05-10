// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Movie = require('../models/Movie.model')

// all your routes here

router.get('/movies/create', (req,res) => {
    res.render('movies/new-movie')
})

router.post('/movies/create', (req,res) => {
    let {title, genre, plot, cast} = req.body;
    async function createMovie() {
        try{
          let createdMov = await Movie.create({title, genre, plot, cast});
          res.redirect('movies');
        } catch(err){
          console.error(err);
          res.redirect('create');
        }
    }
    createMovie();
})

router.get('/movies/movies', (req,res) => {
    async function findAllMovies(){
        try{
            let allMovies = await Movie.find();
            res.render('movies/movies', {response: allMovies});
        }
        catch(err){
            console.error(err);
        }
    }                                                                                                            
    findAllMovies();
})

router.get('/movies/:movieId', (req, res) => {
    const {movieId} = req.params;
    async function findMovieFromDb() {
        try {
            let foundMovie = await Movie.findById(movieId);
            await foundMovie.populate('cast');
            res.render('movies/movie-details', {movie: foundMovie});
        } catch (err) {
            console.error(err);
        }
    }
    findMovieFromDb();
});

router.get('/movies/:movieId/delete', (req,res) => {
    const {movieId} = req.params;
    async function findAndDelete() {
        try {
            let movieDeletion = await Movie.findByIdAndDelete(movieId)
            res.redirect('movies/movies');
        } catch (err) {
            console.error(err)            
        }
    }
    findAndDelete()
})

module.exports = router;