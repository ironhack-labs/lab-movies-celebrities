const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model.js")
// all your routes here

router.get("/movies/create", (req, res) => {
    Celebrity.find()
    .populate("name")
    .then( (celebsFromDb) => {
        const celebs = {
            celebs: celebsFromDb
        }
        res.render("movies/new-movie", celebs)
    })
})

router.post("/movies/create", (req, res) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(newMovie)
        .then(() => {
           res.redirect("/movies")
        })
        .catch(error => {
            console.log("An error occurred while creating a new movie: " + error);
            next(error);
        })
})

router.get("/movies", (req, res) => {
    Movie.find()
        .then(moviesFromDB => {
            res.render("movies/movies", {moviesFromDB})
        })
})

router.get("/movies/:movieId", (req, res) => {
    const {movieId} = req.params
    Movie.findById(movieId)
        .populate("cast")
        .then(movieData => {
            res.render("movies/movie-details", movieData)
        })
        .catch(error => {
            console.log("An error has occurred retrieving movie details: " + error);
            next(error);
        })
})

router.post("/movies/:movieId/delete", (req, res) => {
    const {movieId} = req.params
    Movie.findByIdAndRemove(movieId)
        .then(movieFromDB => {
            res.redirect("/movies")
        })
        .catch(error => {
            console.log("An error has occurred while deleting a movie: " + error);
            next(error);
        })
})

router.get("/movies/:id/edit", (req, res) => {
    const {id} = req.params
    Movie.findById(id)
        .populate("cast")
        .then((movieDataFromDB) => {
            res.render("movies/edit-movie", movieDataFromDB)
        })
        .catch(error => {
            console.log("An error has occurred while editing a movie: " + error);
        })
})

router.post("/movies/:id/edit", (req, res) => {
    const {id} = req.params
    const {title, genre, plot, cast} = req.body
    Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
        .then(() => {
            res.redirect("/movies")
        })
        .catch(error => {
            console.log("An error has occurred while updating a movie: " + error);
            next(error);
        })
})

module.exports = router;