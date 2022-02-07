const router = require('express').Router()

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')
const { route } = require('express/lib/application')

// read
router.get('/', (req, res) => {
    // necesitamos todas las movies
    Movie
        .find()
        .select('title')
        .then(allMovies => res.render('movies/movies', { allMovies }))
        .catch(err => console.log(err))
})

// create
router.get('/create', (req, res) => {

    // necesito todas las celebrities
    Celebrity
        .find()
        .select('name')
        .then(allCelebs => res.render('movies/new-movie', { allCelebs }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')               // populamos el cast
        .then(movieId => res.render('movies/movie-details', movieId))
        .catch(err => console.log(err))
})

// delete
router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

// update
router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    // encontramos la movie
    Movie
        .findById(id)
        // encontrar las celebrities del cast
        .then(movieId => {
            Celebrity
                .find()
                .then(allCelebs => res.render('movies/edit-movie', { movieId, allCelebs }))
                .catch(err => console.log(err))
        })
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(updatedMovie => res.redirect(`/movies/${updatedMovie._id}`))
        .catch(err => console.log(err))

})





module.exports = router