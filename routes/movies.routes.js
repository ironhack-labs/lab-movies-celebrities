const router = require("express").Router();
const Movie = require('../models/Movie.model');
//const Celebrity = require('..models/Celebrity.model');

router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie")
});

router.post("/movies/create", (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };
    Movie.create(newMovie)
        .then((newMovie) => {
            res.redirect("/movies")
        })
        .catch(e => next("movies/new-movie"))
});

router.get("/movies", (req, res, next) => {
    Movie.find()
        .populate("celebrity")
        .then(moviesFromDB => {
            const data = {
                movies: moviesFromDB
            }
            res.render("movies/movies", data)
        })
        .catch(e => next(e))
});



module.exports = router;


