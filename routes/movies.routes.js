const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model")

router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => {
            res.render('movies/new-movie', { celebrity })
        })
        .catch(err => console.log(err))

})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies', (req, res) => {
    Movie
        .find()
        .then(movie => res.render('movies/movies', { movie }))
        .catch(err => console.log(err))
})

router.get('/movies/movie-details/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))

})

router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))
})

router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot })
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router;