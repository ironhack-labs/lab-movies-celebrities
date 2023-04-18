const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

// all your routes here

// Create a movie

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

// Render movies page

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then((moviesFromDB) => {
        console.log(moviesFromDB)
        res.render("movies/movies", { movie: moviesFromDB })
    })
    .catch(err => next(err))
})

// Render movies details page

router.get("/movies/:id", (req, res, next) => {
    const movieId = req.params.id

    Movie.findById(movieId)
    .populate("cast")
    .then(movieFromDB => {
        console.log(movieFromDB)
        res.render("movies/movie-details", { movie: movieFromDB })
    })
    .catch(err => next(err))
})

// Delete a movie

router.post("/movies/delete/:id", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect("/movies")
    })
    .catch(err => next(err))
})

// Edit a movie

router.get("/movies/edit/:id", (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
    .then(movieFromDB => {
        console.log(movieFromDB)
        Celebrity.findById(movieFromDB.cast)
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render("movies/edit-movie", { movie: movieFromDB, celebrity: celebritiesFromDB } )
        })
    })
    .catch(err => next(err))
})

router.post("/movies/edit/:id", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
  
    Movie.findByIdAndUpdate(req.params.id, {
        title,
        genre,
        plot,
        cast
    })
    .then(() => {
        res.redirect(`/movies/${req.params.id}`)
    })
    .catch(err => next(err))
})

module.exports = router;