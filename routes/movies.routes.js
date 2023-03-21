// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res, next) => {

    Celebrity.find()
        .then((celebritiesArr) => {

            res.render("movies/new-movie", { celebrities: celebritiesArr });
        }).catch((err) => {
            
        });
});

router.get("/movies", (req, res, next) => {

    Movie.find()
        .then((moviesArr) => {

            res.render("movies/movies", {movies: moviesArr});

        }).catch((err) => {
            next(err);
        });
});


router.post("/movies/create", (req, res, next) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };

    Movie.create(movieDetails)
        .then(() => {
            res.redirect("/movies");
        }).catch((err) => {
            next(err);
        });

});

module.exports = router;