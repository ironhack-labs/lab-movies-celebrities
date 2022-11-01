// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')



// all your routes here

router.get("/movies/create", async (req, res, next) => {
    const celebs = await Celebrity.find();
    res.render("movies/new-movie", {celebs})
})

router.post("/movies/create", async (req, res, next) => {
    try {
        const { title, genre, plot, cast } = req.body;

        console.log({ title, genre, plot, cast })

        const createdMovie = await Movie.create({ title, genre, plot, cast });


        res.redirect(`/movies`)
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.get("/movies", async(req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', {movies})
        
    } catch (error) {
        console.log(error);
        next(error);        
    }
}) 


router.get("/movies/:id", async(req, res, next) => {
    try {
        
        const { id } = req.params;

        console.log("-------------------------- " + id)
        
        const movies = await Movie.findById(id).populate('cast')
        console.log(movies)
        res.render('movies/movie-details', {movies})
        
    } catch (error) {
        console.log(error);
        next(error);        
    }
})

router.post("/movies/:id/delete", async(req, res, next) => {
    try {
        const {id} = req.params;
        await Movie.findByIdAndRemove(id)
        res.redirect(`/movies`);
        
    } catch (error) {
        consolelog(error)
        next(error)
        
    }
})


router.get("/movies/:id/edit", async (req, res, next) => {
    try {
        const {id} = req.params
        const { title, genre, plot, cast } = req. body

        const movie = await Movie.findById(id);
        const celebrity = await Celebrity.find();

        res.render(`movies/edit-movie`, {movie, celebrity})
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post("/movies/:id", async (req, res, next) => {
    try {
        const {id} = req.params
        const {title, genre, plot, cast} = req. body

        const updatedMovie = await Movie.findByIdAndUpdate(id, {title, genre, plot, cast});

        res.redirect(`/movie-details/${updatedMovie._id}`)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})



module.exports = router;