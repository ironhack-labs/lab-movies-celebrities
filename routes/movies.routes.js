// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { populate } = require("../models/Movie.model");
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
// all your routes here
// creates movies
router.get('/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrityDB => { res.render("movies/new-movie", { celebrityDB }) })
        .catch(err => console.log(err))
})
// creates movies
router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies")
            // res.send('es algo')
        })
        .catch(err => console.log(err))
})
// lists movies
router.get('/', (req, res, next) => {

    Movie
        .find()
        .then(movies => { res.render("movies/movies", { movies }) })
        .catch(err => console.log(err))

})
// lists movie details
router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(moviesfromDB => { res.render("movies/movie-details", moviesfromDB) })
        .catch(err => console.log(err))

})
//deletes movies
router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params
    Movie
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect("/")
        })
        .catch(err => console.log(err))
})
router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => { res.render("movies/edit-movie", movie) })
        .catch(err => console.log(err))

})
//edit movies
router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => { res.redirect(`movies/${id}`) })
        .catch(err => console.log(err))
})
module.exports = router;