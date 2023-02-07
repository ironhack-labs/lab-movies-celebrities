const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");

const router = require("express").Router();

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render("movies/new-movie", { celebrities: celebritiesFromDB })
        })
        .catch(err => next(err))
})

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie.create({ title, genre, plot, cast })
        .then(createdMovie => {
            console.log(createdMovie)
            res.redirect("/movies")
        })
        .catch(err => {
            next(err)
            res.render("movies/new-movie")
        })
})

router.get("/movies", (req, res, next) => {
    Movie.find()
        .then(moviesFromDB => {
            res.render("movies/movies", { movies: moviesFromDB })
        })
        .catch(err => next(err))
})

router.get("/movies/:id", (req, res, next) => {
    const movieId = req.params.id

    Movie.findById(movieId)
        .populate("cast")
        .then(movieFromDB => {
            res.render("movies/movie-details", { movie: movieFromDB })
        })
        .catch(err => next(err))
})


router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err => next(err))
})

module.exports = router;