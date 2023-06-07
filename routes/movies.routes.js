const router = require("express").Router();


const Movie = require('../models/Movie.model');



router.get("/movies", (req, res, next) => {
    Movie.find()
        .then( (moviesFromDB) => {

            const data = {
                movies: moviesFromDB
            }

            res.render("movies/movies", data);
        })
        .catch( e => {
            console.log("error getting list of movies from DB", e);
            next(e);
        });
});



// CREATE: display form
router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(moviesFromDB => {
            res.render("movies/new-movie", {moviesArr: moviesFromDB});
        })
        .catch( e => {
            console.log("error displaying movie create form", e);
            next(e);
        });
});



// CREATE: process form
router.post("/movies/create", (req, res, next) => {

    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };

    Movie.create(newMovie)
        .then( (newMovie) => {
            res.redirect("/movies");
        })
        .catch( e => {
            console.log("error creating new movie data", e);
            next(e);
        });
});




module.exports = router;
