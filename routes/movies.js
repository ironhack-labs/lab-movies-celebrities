const router = require("express").Router()

const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(newCelebrity => {
            res.render('movies/new-movie', { newCelebrity })
        })
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {

    Movie
        .find()
        .then(newMovie => {
            res.render('movies/movies', { newMovie })
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(newMovie => {
            res.render('movies/movie-details', newMovie)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(newMovie => {
            Celebrity
                .find()
                .then(newCelebrity => {
                    res.render('movies/edit-movie', { newCelebrity, newMovie })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

module.exports = router