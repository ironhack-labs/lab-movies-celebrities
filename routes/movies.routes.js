const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

const router = require('express').Router()

router.get('/movies/create', (req, res, next) => {
  Celebrity.find().then((celebrityDB) =>
    res.render('movies/new-movie', { celebrityDB })
  )
})

router.post('/movies/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body
  if (title !== '' && genre !== '' && plot !== '' && cast !== [{}]) {
    Movie.create({ title, genre, plot, cast })
      .then((newMovie) => {
        res.render('movies/movies', { movie: newMovie })
      })
      .catch((err) => next(err))
  } else {
    res.redirect('/movies/create')
  }
})

router.get('/movies/movies', (req, res, next) => {
  Movie.find()
    .then((Movies) => res.render('movies/movies', { movies: Movies }))
    .catch((err) => next(err))
})

module.exports = router
