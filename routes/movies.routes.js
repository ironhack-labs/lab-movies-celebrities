const router = require("express").Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
require("../db")

router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .populate({
            path: "cast",
            select: '-_id name'
        })
        .sort({ title: 1 })
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies/movies'))
        .catch(err => {
            res.render('movies/new-movie')
            console.log(err)
        })
})


module.exports = router;