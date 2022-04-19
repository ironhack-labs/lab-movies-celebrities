const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get("/movies/create", async (req, res, next) => {
    try{
        const celebList = await Celebrity.find();
        res.render("movies/new-movie", { celebs : celebList });
    }catch (err){
        console.log(err);
    }
});

router.post("/movies/create", async (req, res, next) => {
    const {title, genre, plot, cast} = req.body    
    try{
        const newMovie = await Movie.create({title,genre,plot,cast});
    }catch(err){
        console.log(err);
    }
    res.redirect("/movies");
});
  
router.get("/movies/", async (req,res,next) => {
    try{
        const movieList = await Movie.find();
        res.render("movies/movies", { movies : movieList });
    }catch(err){
        console.log('Failed to load movie list ',err);
        res.status(500).json({message: err.message});
    }
});

router.post("/movies/:id/delete", async (req,res,next) => {
    const id = req.params.id;
    try{
        const movieDetails = await Movie.findByIdAndRemove( id );
        res.redirect("/movies");
    }catch(err){
        console.log('Failed to load movie list ',err);
        res.status(500).json({message: err.message});
    }
});

router.get("/movies/:id/edit", async (req,res,next) => {
    const id = req.params.id;
    try{
        const movieDetails = await Movie.findById( id )
        const celebList = await Celebrity.find();
        console.log(movieDetails);
        res.render("movies/edit-movie", { movie : movieDetails, celebs : celebList });
    }catch(err){
        console.log('Failed to load movie list ',err);
        res.status(500).json({message: err.message});
    }
});

// table in lab implies creating /movies/:id/edit
// as your post recipient
// however, written description shows to just use a post
// to the existing /movies/:id/
router.post("/movies/:id", async (req,res,next) => {
    const {title, genre, plot, cast} = req.body    
    const id = req.params.id;
    try{
        const updateMovie = await Movie.findByIdAndUpdate(id,{title,genre,plot,cast});
    }catch(err){
        console.log(err);
    }
    res.redirect(`/movies/${id}`);
});

router.get("/movies/:id", async (req,res,next) => {
    const id = req.params.id;
    try{
        const movieDetails = await Movie.findById( id ).populate("cast")
        res.render("movies/movie-details", { movie : movieDetails });
    }catch(err){
        console.log('Failed to load movie list ',err);
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
