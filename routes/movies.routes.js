const router = require('express').Router()
const { redirect } = require('express/lib/response')
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


router.get("/crear", (req, res) => {

    Celebrity
        .find()
        .then((cel) => res.render('movies/new-movie', {cel}))
        .catch(err => console.log(err))
})

router.post("/crear", (req, res) => {
    const {title, genre, plot, cast} = req.body
    Movie
    .create({title, genre, plot, cast})
    .then((movie) => res.redirect('/peliculas'))
    .catch(err => console.log(err))
})

router.get("/", (req, res, next) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

module.exports = router