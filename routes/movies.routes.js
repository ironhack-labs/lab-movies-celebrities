const express = require("express")
const router = express.Router()

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => {
            res.render('movies/new-movie', { celebrity })
        })
        .catch(error => console.log(error))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    console.log(cast)
    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(error => console.log(error))
})

router.get('/', (req, res) => {
    Movie
        .find()
        .then(movie => {
            res.render('movies/movies', { movie })
        })
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(error => console.log(error))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(res.redirect('/movies'))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            Celebrity
                .find()
                .then(celebrity => {
                    res.render('movies/edit-movie', { movie, celebrity: celebrity })
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})

router.post('/:id/edit', (req, res) => {
    const { title, genre, plot } = req.body
    const { id } = req.params
    console.log(id)
    console.log(title, genre, plot)
    Movie
        .findByIdAndUpdate(id, { title, genre, plot })
        .then(() => {
            res.redirect(`/movies/${id}`)
        })

})



module.exports = router;