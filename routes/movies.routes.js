const router = require("express").Router()
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


// GET /movies/create
router.get('/movies/create', (req, res, next) => {
  Celebrity
    .find()
    .then(celebritiesFromDB => {
      res.render("movies/new-movie.hbs", { celebrity: celebritiesFromDB })
    })
    .catch(err => console.log('Error @ GET /movies/create: ', err))
})

// POST /movies/create
router.post('/movies/create', (req, res, next) => { 
  const { title, genre, plot, cast } = req.body
  
  Movie
    .create({ title, genre, plot, cast })
    .then(movie => {
      console.log('New movie created successfully')
      res.redirect('/movies')
    })
  .catch(err => console.log('Error @ POST /movies/create', err))
})

// GET /movies
router.get('/movies', (req, res, next) => {
  Movie
    .find()
    .then((allMovies) => {
      res.render("movies/movies.hbs", { movie: allMovies })
    })
    .catch(err => console.log('Error @ GET /movies', err))
})

module.exports = router