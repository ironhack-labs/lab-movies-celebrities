const router = require("express").Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
require("../db")

router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .populate({
            path: 'cast',
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

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate({
            path: "cast",
            select: '-_id name occupation catchPhrase'
        })
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.error(err))

})

router.post("/:id/delete", (req, res, next) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect("/movies/movies"))
        .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))
})


router.post('/:id/edit', (req, res, next) => {

    const { title, genre, plot, cast, id } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies/movies'))
        .catch(err => console.log(err))
})



module.exports = router