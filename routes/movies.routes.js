const router = require("express").Router();
const MovieModel = require("../models/Movie.model.js")
const CelebrityModel = require("../models/Celebrity.model");
const { findById } = require("../models/Movie.model.js");

router.get('/create', async (req, res) => {
    const allCelebrities = await CelebrityModel.find();
    res.render('movies/new-movie', {allCelebrities});
});

router.post('/create', async (req,res) => {
    const movieInfo = req.body;
    const newMovie = await MovieModel.create(movieInfo);
    res.redirect('/movies/movies')
});

router.get('/movies', async (req,res) => {
    const allMovies = await MovieModel.find();
    res.render('movies/movies', {allMovies});
});

router.get('/:id', async (req,res) => {
    try {
        const oneMovie = await MovieModel.findById(req.params.id).populate("cast");
        // console.log("params", oneMovie)
        res.render('movies/movie-details', {oneMovie})
    } catch {(err) =>
        console.log("Error to acess the movie by ID on DB: ", err)
        }; 
});

router.post('/:id/delete', async (req,res) => {
    try {
        const deleteMovie = await MovieModel.findByIdAndRemove(req.params.id);
        res.redirect('/movies/movies');
    } catch {(err) =>
        console.log("Error to delete the movie on DB: ", err)
        }; 
});

router.get('/:id/edit', async (req,res) => {
    try {
        const movieToUpdate = await MovieModel.findById(req.params.id);
        const allCelebrities = await CelebrityModel.find();
        console.log("params", req.params)
        res.render('movies/edit-movie', {movieToUpdate, allCelebrities});
    } catch {(err) =>
        console.log("Error to edit the movie on DB: ", err)
        }; 
});

router.post('/:id/edit', async (req,res) => {
    try {
        const newMovieInfo = req.body;
        const updatedMovie = await MovieModel.update(newMovieInfo);
        res.redirect('/movies/movies')

    } catch {(err) =>
        console.log("Error to edit the movie on DB: ", err)
        }; 
})




module.exports = router;