// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// all your routes here

//* Test Route
router.get("/test", (req, res, next) => {
    res.render("testview");
});

//* Movie Create Route
//? GET Variant
router.get("/movies/create", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie", {celebrities});
    } catch (error) {
        console.log(error);
        next(error);
    };
});

//? POST Variant
router.post("/movies/create", async (req, res, next) => {

    try {
        const {title, genre, plot, cast} = req.body;

        const createdMovie = await Movie.create({title, genre, plot, cast});
        res.redirect(`/movies`);
        
    } catch (error) {
        console.log(error)
        res.redirect(`/movies/create`);
    };
});

//* Movie List Route
router.get("/movies", async (req, res, next) => {
    try {
        const movies = await Movie.find();
        const celebrities = await Celebrity.find();
        res.render("movies/movies", {movies, celebrities});
    } catch (error) {
        console.log(error);
        next(error);
    };
});

//* Movie Details Route

router.get('/movies/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const celebs = await Celebrity.find();

        const movie = await Movie.findById(id);

        res.render('movies/movie-details', {movie, celebs});

    } catch (error) {
        console.log(error);
        next(error);
    }
})

//* Movie Delete Route

router.post('/movies/:id/delete', async (req, res, next) => {
    try {
        const {id} = req.params;

        await Movie.findByIdAndRemove(id);
        res.redirect(`/movies`);
    } catch (error) {
        console.log(error);
        next(error);
    };
});

module.exports = router;