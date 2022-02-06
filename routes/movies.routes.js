const router = require('express').Router()
const Movies = require('../models/Movies.model')
const Celeb = require('../models/Celebrity.model')

router.get('/movies/create', (req, res) => {
    Celeb
        .find()
        .then(data => res.render('movies/new-movie', { data }))
        .catch(err => console.log(err))
})
router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movies
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies', (req, res) => {
    Movies
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/movies/:id', (req, res) => {
    const { id } = req.params

    Movies
        .findById(id)
        .populate('cast')
        .then(movies => res.render('movies/movie-details', movies))
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params

    Movies
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params

    Movies
        .findById(id)
        .then(movie => {
            Celeb
                .find()
                .then(celebs => res.render('movies/edit-movie', { movie, celebs }))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

})
router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movies
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})

module.exports = router