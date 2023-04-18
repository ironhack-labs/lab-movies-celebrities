const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        res.render("movies/new-movie", { celebrity: celebritiesFromDB })
    })
})

router.post("/movies", (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie.create({ title, genre, plot, cast })
    .then(createdMovie => {
        console.log(createdMovie)
        res.redirect(`/movies`)
    })
    .catch(err => res.redirect(`/movie/create`))
})

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then((moviesFromDB) => {
        console.log(moviesFromDB)
        res.render("movies/movies", { movie: moviesFromDB })
    })
    .catch(err => next(err))
})

module.exports = router;