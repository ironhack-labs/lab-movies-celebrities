const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// Add new movies
router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => res.render('movies/new-movie'))
})

// Display list of movies
router.get('/movies', (req, res) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

// Display movie details
router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))

})

// Delete movie
router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})

// Edit movie
router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(movie => {
            Celebrity

                .find()
                .then(celebrities => res.render('movies/edit-movie', { movie, celebrities }))
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`))
        .catch(err => console.log(err))
})

module.exports = router