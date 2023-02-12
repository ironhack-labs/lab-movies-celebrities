// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express');
const { find } = require('../models/Celebrity.model');
const router = express.Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")
require("../db")

router.get("/movies", (req, res) => {
    Movie
        .find()
        .populate({
            path: "cast",
            select: '-_id name'
        })
        .sort({ title: 1 })
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.error("Se ha producido un error obteniendo las peliculas. Error:", err))
})

router.get("/movies/create", (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render("movies/new-movie", { celebrities }))
        .catch(err => console.log(err))
})

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(movie => res.redirect("/movies"))
        .catch(err => console.error("Se ha producido un error insertando la pelicula. Error:", err))
})

router.get("/movies/:id", (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate({
            path: "cast",
            select: '-_id name occupation catchPhrase'
        })
        .then(movie => res.render("movies/movie-details", movie))
        .catch(err => console.error(err))
})

router.post("/movies/:id/delete", (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect("/movies"))
        .catch(err => console.error(err))
})

router.get("/movies/:id/edit", (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebrities => {
                    const celebritiesSelected = movie.cast
                    const celebritiesFiltered = { selected: [], notSelected: [] }
                    celebrities.forEach(celebrity => {
                        celebritiesSelected.includes(celebrity._id)
                            ? celebritiesFiltered.selected.push(celebrity)
                            : celebritiesFiltered.notSelected.push(celebrity)
                    })
                    return res.render("movies/edit-movie", { movie, celebritiesFiltered })
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
})

router.post("/movies/:id/edit", (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect("/movies"))
        .catch(() => res.render("movies/edit-movie"))
})


module.exports = router;