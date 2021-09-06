// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router()

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all your routes here

//lista de peliculas
router.get("/movies", (req, res) => {

  Movie
    .find()
    .then(movies => res.render('movies/movies', { movies }))
    .catch(err => console.log(err))
})

//crear una peli
router.get("/movies/create", (req, res) => {
  
  Celebrity
  .find()
  .then(celebrities => res.render('movies/new-movie', { celebrities }))
  .catch(err => console.log(err))

})

router.post('/movies/create', (req, res) => {

  const { title, genre, plot, cast } = req.body

  Movie
    .create({ title, genre, plot, cast })
    .then(theMovie => res.redirect(`/movies/${theMovie._id}`))
    .catch(err => console.log(err))
})

// detalles de las pelis
router.get('/movies/:id', (req, res) => {

  const { id } = req.params
  console.log('NO ARRIESGO =====>', id)

  Movie
    .findById(id)
    .populate('cast')
    .then(theMovie => res.render('movies/movie-details', theMovie))
    .catch(err => console.log(err))

})

module.exports = router
