const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')
const router = require('express').Router()

router.get('/', (req, res, next) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res, next) => {

    Celebrity
        .find()
        .then(theCelebrities => res.render('movies/new-movie', { theCelebrities }))
        .catch(err => console.log(err))


})

router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => res.render('movies/new-movie'))
})

router.get('/details/:movie_id', (req, res, next) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))

})

router.post('/:movie_id/delete', (req, res, next) => {
    const { movie_id } = req.params
    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/:movie_id/edit', (req, res, next) => {
    const { movie_id } = req.params
    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))

    // Celebrity
    //     .find()
    //     .then(celebrity => {
    //         res.render('movies/edit-movie', celebrity)
    //     })
})

router.post('/:movie_id/edit', (req, res, next) => {
    const { movie_id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router