// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// Requiring Models
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// GET route to display all the movies int th DB
router.get("/movies", async (req, res) => {
    try {
        let allMoviesFromDB = await Movie.find();

        res.render("movies/movies.hbs", {
            movies: allMoviesFromDB,
        });
    } catch (error) {
        console.log("Error while getting movies", error);
    }
});

/* CREATE MOVIES */
//Go to create page
router.get("/movies/create", async (req, res) => {
    try {
        let allCelebritiesFromDB = await Celebrity.find();
        res.render("movies/new-movie.hbs", {
            celebrities: allCelebritiesFromDB,
        });
    } catch (error) {
        console.log(error);
    }
});

// Post new celebrity and return to movies page
router.post("/movies/create", async (req, res) => {
    try {
        // Object destructuring
        const { title, genre, plot, cast } = req.body;
        //
        await Movie.create({ title, genre, plot, cast });
        res.redirect("/movies");
    } catch (error) {
        console.log("Error: " + error);
    }
});

// DETAILS MOVIES
router.get("/movies/movie-details", async (req, res) => {
    try {
        let allMoviesFromDB = await Movie.find();

        res.render("movies/movies.hbs", {
            movies: allMoviesFromDB,
        });
    } catch (error) {
        console.log("Error while getting movies", error);
    }
});

// DETAILS MOVIES

router.get("/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Fund Book via its Id inside the Db
        let foundMovie = await Movie.findById(id).populate("cast");

        res.render("movies/movie-details.hbs", { movies: foundMovie });
    } catch (error) {
        console.log(error);
    }
});

// DELETE MOVIES
router.post("/movies/:id/delete", async (req, res, next) => {
    try {
        const { id } = req.params;
        await Movie.findByIdAndDelete(id);
        res.redirect("/movies");
    } catch (error) {
        console.log(error);
    }
});
// all your routes here
module.exports = router;
