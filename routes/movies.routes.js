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

// GET /movies/:movieId
router.get('/movies/:movieId', (req, res, next) => {
  const { movieId } = req.params
  Movie
    .findById(movieId)
    .populate("cast")
    .then((movie) => res.render("movies/movie-details.hbs", { movie }))
    .catch((err) => console.log("Error @ GET /movies/:movieId", err))
})

// POST /movies/:movie/delete
router.post('/movies/:movieId/delete', (req, res, next) => { 
  const { movieId } = req.params
  Movie
    .findByIdAndDelete(movieId)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log("Error @ POST /movies/:movieId/delete", err))
})

// GET movies/:movieId/edit
router.get('/movies/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params
  Movie
    .findById(movieId)
    .populate('cast')
    .then(movie => {
      Celebrity
        .find()
        .then(celebrities => {
          res.render("movies/edit-movie.hbs", { movie, celebrity: celebrities })
        })
        .catch((err) => console.log("Error @ GET /movies/:movieId/edit", err))
    })
})

// POST movies/:movieId/edit
router.post('/movies/:movieId/edit', (req, res, next) => { 
  const { movieId } = req.params

  Movie.findById(movieId).then(movieProps => {
    let { title, genre, plot, cast } = req.body

    if (!title) title = movieProps?.title
    if (!genre) genre = movieProps?.genre
    if (!plot) plot = movieProps?.plot
    if (!cast) cast = movieProps?.cast

    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
      .then(() => res.redirect("/movies"))
      .catch((err) => console.log("Error @ POST /movies/:movieId/edit", err))
  })
})

module.exports = router