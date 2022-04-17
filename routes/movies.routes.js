// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require('../models/Celebrity.model');




router.get("/movies/create", (req, res, next) => {

    Celebrity
        .find()
        .then(Celebrity => {
            res.render('movies/new-movies', { Celebrity })
        })
        .catch(err => console.log(err))

});

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect("/")
        })
        .catch(err => console.log(err))
})


router.get("/movies", (req, res, next) => {

    Movie
        .find()
        .populate('cast')
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))

});

router.get("/movies/:id", (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movies => {
            res.render('movies/movie-detail', movies)
        })
        .catch(err => console.log(err))

})

router.post("/movies/:id/delete", (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect("/")
        })
})

router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate("cast")
        .then(movie => {
            res.render('movies/edit-movie', movie)

        })
        .catch(err => console.log(err))

})

router.post("/movies/:id/edit", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    const { id } = req.params
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))

});





module.exports = router;