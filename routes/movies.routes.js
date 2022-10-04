// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//READ: List all movies
router.get("/movies", (req, res, next) => {
    Movie.find()
    .populate("cast")
    .then( moviesFromDB => {
        res.render("movies/movies", {movies: moviesFromDB})
    })
    .catch(err => {
        console.log("error getting movies from DB", err);
        next(err);
    })
})

//CREATE: Add new movie: display form
router.get(`/movies/create`, (req, res, next) => {
    Celebrity.find()
    .then( celebrityFromDb => {
        res.render("movies/new-movie", {celebrityFromDb});
    })
    .catch((err) => {
        console.log("Error getting celebs from DB...", err);
        next(err);
      });
})

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
    console.log(req.body);

    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    //Redirect
    Movie.create(movieDetails)
    .then(movieDetails => {
        res.redirect("/movies");
    })
    .catch((err) => {
        console.log("Error creating movie...", err);
        next(err);
    });
})



module.exports = router;