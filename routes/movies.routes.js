// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/movie.model")
const Celebrity = require("../models/celebrity.model")

// all your routes here

router.get("/movies", (req, res) => {
    Movie.find()
        .then(movies => {
            res.render("movies/movies", { movies })
        })
        .catch(err => {
            throw new err
        })
})

router.get("/movies/:id", (req, res) => {
    const movieId = req.params.id
    Movie.findById(movieId)
        .populate("cast")
        .then(movie => {
            res.render("movies/movie-details", { movie })
        })
        .catch(err => {
            throw new err
        })
})

router.post("/movies/:id/delete", (req, res) => {
    const movieId = req.params.id
    Movie.findByIdAndRemove(movieId)
        .then(() => {
            res.status(204).redirect("/movies/movies")
        })
        .catch(err => {
            throw new err
        })
})

router.get("/movies/:id/edit", (req, res) => {
    const movieId = req.params.id
    Movie.findById(movieId)
        .populate("cast")
        .then((movie) => {
            res.render("movies/edit-movie", { movie })
        })
        .catch(err => {
            throw new err
        })
})

router.post("/movies/:id/edit", (req, res) => {
    const updatedMovie = req.body
    const movieId = req.params.id
    Movie.findByIdAndUpdate(movieId, updatedMovie)
        .then(() => {
            res.status(204).redirect("/movies/movies")
        })
        .catch(err => {
            throw new err
        })
})

router.get("/create", (req, res) => {
    Celebrity.find()
        .then(cast => {
            res.render("movies/new-movie", { cast })
        })
        .catch(err => {
            throw new err
        })
})

router.post("/create", (req, res) => {
    const movie = req.body
    Movie.create(movie)
        .then(() => {
            res.redirect("movies")
        })
        .catch(() => {
            res.redirect("/movies/create")
        })
})

module.exports = router;