const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movies.model')

router.get('/movies/create', async (req, res) => {
  const celebsArr = await Celebrity.find()
  res.render('movies/new-movie', { celebsArr })
})

router.post('/movies/create', async (req, res) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  }
  try {
    await Movie.create(newMovie)
    res.redirect('/movies')
  } catch (e) {
    console.log(e)
    const error = new Error('There has been a problem. Please try again.')
    res.render('movies/new-movie', { error: error.message })
  }
})

router.get('/movies', async (req, res) => {
  try {
    const moviesArr = await Movie.find()
    res.render('movies/movies', { moviesArr })
  } catch (e) {
    console.log('something went wrong...', e)
  }
})

router.get('/movies/:movieId', async (req, res) => {
  try {
    const mov = await Movie.findById(req.params.movieId).populate('cast')
    console.log(mov.cast)
    res.render('movies/movie-detail', mov)
  } catch (e) {
    console.log('something went wrong...', e)
  }
})

module.exports = router
