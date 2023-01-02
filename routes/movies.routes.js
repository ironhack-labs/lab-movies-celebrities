// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

// Create a route for adding new celebrities

router.get("/movies/create", (req, res, next) => {
    Movie.find()
        .populate("movie")
        .then(movies => {
            console.log(movies);
            res.render("movies/new-movie", { movies });
        })
        .catch(err => {
            console.log('Error getting movies from DB...', err);
            next(err);
        })
});

router.post("/movies/create", (req, res, next) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(movieDetails)
        .then(movieDetails => {
            console.log(movieDetails);
            res.redirect("/movies");
        })
        .catch(err => {
            console.log("error creating new movie in DB", err);
            res.render("movies/new-movie");
            next();
        })
});


router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/celebrities", { celebrities });
        })
        .catch(err => {
            console.log('Error getting authors from DB...', err);
            next(err);
        })
});

module.exports = router;