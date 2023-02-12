const router = require("express").Router()

//Model
const Celebrities = require('./../models/Celebrities.model')
const Movies = require('./../models/Movies.model')

// List
router.get('/movies', (req, res, next) => {
    Movies
        .find()
        .populate('cast')
        .sort({ title: 1 })
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log('Error:', err))
})

// Details
router.get('/movies/:movieId', (req, res, next) => {
    const { movieId } = req.params
    Movies
        .findById(movieId)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log('Error:', err))
})

// Create
router.get('/movies-create', (req, res, next) => {
    Celebrities
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log('Error:', err))
})

router.post('/movies-create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movies
        .create({ title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})

// Delete
router.post('/movies/:movieId/delete', (req, res, next) => {
    const { movieId } = req.params
    Movies
        .findByIdAndDelete(movieId)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})

// Edit
router.get('/movies/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params
    Movies
        .findById(movieId)
        .then(movie => {
            res.render('./movies/edit-movie', { movie })
        })
        .catch(err => console.log('Error:', err))
})

router.post('/movies/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params
    const { title, genre, plot, cast } = req.body
    Movies
        .findByIdAndUpdate(movieId, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})



module.exports = router;