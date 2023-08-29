const router = require("express").Router();

const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res, next) => {
    res.render("movie/new-movie");
})


router.post("/movies/create", (req, res, next) => {


    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(newMovie)
        .then((newCelebrity) => {
            res.redirect("/movies");
        })
        .catch(err => {
            res.render("movies/new-movie")
        })
});


router.get("/movies", (req, res, next) => {

    Movie.find()
        .then(MoviesFromDB => {

            res.render("movies/movies.hbs", { MoviesFromDB })
        })
        .catch(err => {
            next(err);
        })
});







module.exports = router;