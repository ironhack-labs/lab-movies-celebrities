// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
// const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movies.model')
// all your routes here

//CREATE THINGS
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .sort({ title: 1 })
        .then(moviesFromDB => {
            res.render('movies/movies', { moviesFromDB })
        })
        .catch(err => console.log(err))
})
router.get('/movies/create', (req, res, next) => {
    Movie
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(moviesFromDB => {
            res.render('movies/new-movie', { moviesFromDB })
        })
        .catch(err => console.log(err))
})
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})
//DELETE THINGS
router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
});

module.exports = router;