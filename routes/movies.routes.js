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
    console.log(req.body)

    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(newMovie)
    .then( () => {
        res.redirect("/movies")
    })
})

router.get("/movies", (req, res) => {
    Movie.find()
    .populate("cast")
    .then( (moviesFromDB) => {
        const moviesList = {
            movies: moviesFromDB
        }
        console.log(moviesList)
        res.render("movies/movies", moviesList)
    })   
})

router.get("/movies/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    Movie.findById(id)
    .populate("cast")
    .then( (foundMovie) => {
        const movieFromApi = {
                movie: foundMovie
        }
        console.log(movieFromApi)
        res.render("movies/movie-details", movieFromApi)
    })
    .then( () => {
        console.log("Movie found and displayed")
    })
    .catch( (err) => {

        console.log("Error occurred while displaying movie details", err)
    })
}) 

router.post("/movies/:id/delete", (req, res) => {
    const id = req.params.id
    Movie.findByIdAndDelete(id)
    .then( () => {
        res.redirect("/movies")
    })
    .then( (err) => {
        console.log(err)
    })
})

router.get("/movies/:id/edit", (req, res) => {
    const id = req.params.id
    Movie.findById(id)
    .then ((foundMovie) => {
        Celebrity.find()
    })
})

module.exports = router;