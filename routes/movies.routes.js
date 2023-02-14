const express = require('express')
const router = express.Router()
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/', async(req, res, next) => {
    try {
        const allMovies = await Movie.find()
        res.render('movies/movies', {movies: allMovies})
    } catch (error) {
        next(error)
    }
})

router.get('/create', async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render('movies/new-movie', { celebrities: allCelebrities})
    } catch (error) {
        next(error)
    }
})

router.post('/create', async (req, res, next) => {
    console.log(req.body) 
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }
  // res.send(req.body)
    try {
        const newlyCreatedMovie = await Movie.create(movie)
        console.log(newlyCreatedMovie)
        res.redirect('/movies')
        } catch (error) {
            return res.redirect('/movies/new-movie')
            console.log(error)
            next(error)
        }
})

router.get('/:id', async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id).populate('cast')
      const relatedCast = await Celebrity.find({ movie: req.params.id })
      res.render('movies/movie-details', { movie, relatedCast })
  
      // res.send({ movie, relatedCelebrities })
    } catch (error) {
      next(error)
    }
  })



module.exports = router