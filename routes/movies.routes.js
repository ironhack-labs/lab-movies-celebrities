const router = require('express').Router()
const Movie = require('../models/Movie')
const Celebrities = require('../models/Celebrity.model')
const req = require('express/lib/request')

router.get('/create', (req, res) => {
    Celebrities
        .find()
        .then(newCel => {
            res.render('./movies/new-movie', { newCel })
        })
        .catch(err => err)
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(newMovie => {
            res.redirect('/movies')
        })
        .catch(err => err)
})

router.get('/', (req, res) => {
    Movie
        .find()
        .then(newMovie => {
            res.render('./movies/movies', { newMovie })
        })
        .catch(err => err)
})



router.get('/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(eachMovie => {
            res.render('./movies/movie-details', eachMovie)
        })
        .catch(err => err)
})

module.exports = router

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndRemove(id)
        .then(movieDeleted => {
            res.redirect('/movies')
        })
        .catch(err => err)
})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(oneMovie => {
            Celebrities.find()
                .then(allActors => {
                    res.render('./movies/edit-movie', { oneMovie, allActors })
                })
        })
        .catch(err => console.log(err))
})
router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(updateMovie => {

            res.redirect('/movies')

        })
        .catch(err => console.log(`soy el error de update movie ${err}`))
})