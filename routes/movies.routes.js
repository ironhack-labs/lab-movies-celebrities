const router = require("express").Router();
const Movie = require ("../models/Movie.model")

// all your routes here
router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie")
})

router.post("/movies/create", (req, res, next) => {
    console.log(req.body)
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast 
    }

    Movie.create(newMovie)
        .then( (movieFromDB) => {
            console.log(movieFromDB)
            res.redirect("/movies")
        })
        .catch( e => {
            console.log("Error adding new movie", e)
            res.render("movies/new-movie")
            next(e);
        })
})


module.exports = router;