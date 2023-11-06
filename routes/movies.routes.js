const express = require("express")
const router = express.Router()

const Movie = require('../models/Movie.model')


router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.error(err))
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-detail', movie)
        })
        .catch(err => console.error(err))
})

router.get('/create', (req, res) => {
    console.log("entramos en crear una nueva peli")
    // res.render('movies/new-movie')
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .populate("cast")
        .then(movie => res.redirect(`/movies/${movie._id}`))
        .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params


    Movie
        .findById(id)
        .then(movie => res.render(`movies/edit-movie`, movie))
        .catch(err => console.error(err))

})

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(err => console.error(err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.error(err))
})

module.exports = router