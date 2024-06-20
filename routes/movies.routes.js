// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/movies/create",async (req,res) => {
    let allCelebritiesFromDb = await Celebrity.find();

    res.render("movies/new-movie.hbs", {celebrities: allCelebritiesFromDb});
});


router.post("/movies/create", async (req,res) => {
    try {
        const {title, genre, plot, cast} = req.body;
        
        await Movie.create({title, genre, plot, cast});
        res.redirect("/movies");
    }
    catch (error){
        console.log(error)
        res.render("movies/new-movie.hbs");
    }
});


router.get("/movies", async (req,res) => {
    try{
        let allMoviesFromDb = await Movie.find();

        res.render("movies/movies.hbs", {movies: allMoviesFromDb});

    }
    catch(error){
        console.log("Error while getting movies", error);
    }
});


router.get("/movies/:movieId", async (req,res) => {        
    try{
        const {movieId} = req.params;

        let chosenMovie = await Movie.findById(movieId).populate("cast");
        
        res.render("movies/movie-details.hbs", {chosenMovie});

    }
    catch(error){
        console.log("Error while getting the movie", error);
    }
});


router.get("/movies/:movieId/edit", async (req, res) => {
    try{
        const {movieId} = req.params;

        let chosenMovie = await Movie.findById(movieId)
        let allCelebritiesFromDb = await Celebrity.find()
        
        res.render("movies/edit-movie", {movie: chosenMovie, celebrities: allCelebritiesFromDb})
    }
    catch(error){
        console.log(error);
    }
})


router.post("/movies/:movieId/edit", async (req,res) => {
    try{
        const {movieId} = req.params;
        const {title, genre, plot, cast} = req.body;
        
        await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast}, {new: true});
        
        res.redirect(`/movies/${movieId}`);
    }
    catch (error){
        console.log(error);
    }
});

router.post('/movies/:movieId/delete', async (req, res) => {
    try{
        const {movieId} = req.params;
        await Movie.findByIdAndRemove(movieId);
        res.redirect('/movies')
    }
catch(error){console.log(error)}
});


module.exports = router;