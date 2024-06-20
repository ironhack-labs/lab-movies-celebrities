const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies', async (req, res) => {
    try{
        let findAllMovies = await Movie.find();
        res.render('movies/movies.hbs', {movies: findAllMovies});
    }catch(error){
        console.log(error);
    }
});

router.get('/movies/create', async (req, res) => {
    let getInfoCelebrities = await Celebrity.find();

    res.render('movies/new-movie.hbs', {infoCelebrities: getInfoCelebrities});
});

router.post('/movies/create', async (req, res) => {
    try{
        const {title, genre, plot, cast} = req.body;
        await Movie.create({title, genre, plot, cast});
        res.redirect("/movies");
    }catch(error){
        console.log(error);
    }
});

router.get('/movies/:id', async(req, res) => {
    try{
        const {id} = req.params;
        let foundMovie = await Movie.findById(id);

        await foundMovie.populate('cast');

        res.render('movies/movie-details.hbs', {movie: foundMovie});
    }catch(error){
        console.log(error);
    }
});

router.get('/movies/:movieId/edit', async(req, res) => {
    try{
        let getInfoCelebrities = await Celebrity.find();

        const {movieId} = req.params;
        let foundMovie = await Movie.findById(movieId);

        res.render('movies/edit-movie.hbs', {movie: foundMovie, celebrities: getInfoCelebrities});
    }catch(error){
        console.log(error);
    }
});

router.post('/movies/:movieId/edit', async (req, res) => {
    try{
        const {movieId} = req.params;
        const {title, genre, plot} = req.body;

        await Movie.findByIdAndUpdate(movieId, {title, genre, plot}, {new: true});

        res.redirect('/movies');
    }catch(error){
        console.log(error);
    }
}); 

router.post('/movies/:movieId/delete', async (req, res) => {
    const {movieId} = req.params;
    console.log(movieId);

    try{
        await Movie.findByIdAndRemove(movieId);
        res.redirect('/movies');
    }catch(error){
        console.log(error);
    }
});


module.exports = router;