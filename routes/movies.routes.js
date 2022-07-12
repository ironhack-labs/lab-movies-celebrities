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
  const moviesArr = await Movie.find().populate()
  res.render('movies/movies', { moviesArr })
})

module.exports = router
