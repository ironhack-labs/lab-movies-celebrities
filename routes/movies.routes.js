const router = require("express").Router()
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movies.model")

router.get("/movies/create", (req, res, next) => {
   
    Celebrity.find()
            .then(foundCelebrities => {
                res.render("movies/new-movie", {celebrities : foundCelebrities})
            })
            .catch(err => next(err))
})

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie.create({title, genre, plot, cast})
        .then(createdMovie => {
            console.log(createdMovie)
            res.redirect("/movies")
        })
        .catch(err => next(err))
})

router.get("/movies", (req, res, next) => {

    Movie.find()
        .then(foundMovies => {
            res.render("movies/movies", {movies : foundMovies})
        })
        .catch(err => next(err))
})

router.get("/movies/:id", (req, res, next) => {
    const id = req.params.id

    Movie.findById(id)
        //.populate("cast")
        .then(foundMovie => {
            Celebrity.findById(foundMovie.cast)
                .then(foundCelebrities => {
                    console.log(foundCelebrities)
                    res.render("movies/movie-details", {movie : foundMovie, celebrities : foundCelebrities})
             })
        })
        .catch(err => next(err))
})

router.get("/movies/delete/:id", (req, res, next) => {
    const id = req.params.id

    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err => next(err))
})

router.get("/movies/edit/:id", (req, res, next) => {
    const id = req.params.id

    Movie.findById(id)
        .then(foundMovie => {
            Celebrity.findById(foundMovie.cast)
                .then(foundCelebrities => {
                    res.render("movies/edit-movie", {movie : foundMovie, celebrities : foundCelebrities})
                })
        })
        .catch(err => next(err))
})

router.post("/movies/edit/:id", (req, res, next) => {
    const id = req.params.id
    const { title, genre, plot, cast } = req.body

    Movie.findByIdAndUpdate(id, {
        title,
        genre,
        plot,
        cast
    })
        .then(() => {
            res.redirect(`/movies/${id}`)
        })
        .catch(err => next(err))
})

module.exports = router