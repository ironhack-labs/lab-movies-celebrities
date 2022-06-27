const router = require("express").Router()

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

// creation

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => {
            res.render('movies/new-movie', { celebrity })
        })
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create(req.body)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

// reading

router.get('/', (req, res) => {

    Movie
        .find()
        .then(moviesData => {
            res.render('movies/movies', { moviesData })
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(selectedMovie => {
            res.render('movies/movie-details', selectedMovie)
        })
        .catch(err => console.log(err))
})

//delete

router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


//edit

router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .then((selectedMovie) => {
            Celebrity
                .find()
                .then(celebirtiesData => {
                    const info = [selectedMovie, celebirtiesData]
                    res.render('movies/edit-movie', { info })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

module.exports = router