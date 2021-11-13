const router = require('express').Router()
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

router.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => res.render('movies/movies', { movies }))
    .catch((err) => console.error(err))
})

router.get('/create', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('movies/new-movie', { celebrities })
    })
    .catch((err) => console.error(err))
})

router.post('/create', (req, res, next) => {
  Movie.create(req.body)
    .then(() => res.redirect('/movies'))
    .catch((err) => {
      console.error(err)
      res.render('movies/new-movie', {
        errorMessage: 'An error ocurred while creating the movie',
      })
    })
})

router.get('/:movieId', (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('cast')
    .then((movie) => res.render('movies/movie-details', movie))
    .catch((err) => console.error(err))
})

router.post('/:movieId/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then(() => res.redirect('/movies'))
    .catch((err) => console.error(err))
})

module.exports = router
