const router = require("express").Router();
const Movies = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model');
const { findById } = require("../models/Celebrity.model");


router.get('/movies/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch((err) => console.log(err))
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot } = req.body

    Movies
        .create({ title, genre, plot })
        .then(() => res.redirect('/movies'))
        .catch((err) => console.log(err))
})

router.get('/movies', (req, res, next) => {
    Movies
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/movies/:id', (req, res, next) => {
    const { _id } = req.params
    console.log("----------------", _id)

    Movies
        .findById(_id)
        .populate('cast')
        .then(movies => res.render('movies/movie-details', movies))
        .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params
    Movies
        .findById(id)
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))
})

router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot } = req.body

    Movies
        .findByIdAndUpdate(id, { title, genre, plot }, { new: true })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})

router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movies
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})










module.exports = router;