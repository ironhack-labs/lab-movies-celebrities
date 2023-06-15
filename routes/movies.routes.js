const router = require("express").Router()
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


// GET /movies/create
router.get('/create', (req, res, next) => {
  Celebrity
    .find()
    .then(celebritiesFromDB => {
      res.render("movies/new-movie.hbs", { celebrity: celebritiesFromDB })
    })
    .catch(err => console.log('Error @ GET /movies/create: ', err))
})

// POST /movies/create
router.post('/create', (req, res, next) => { 
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
router.get('/', (req, res, next) => {
  Movie
    .find()
    .then((allMovies) => {
      res.render("movies/movies.hbs", { movie: allMovies })
    })
    .catch(err => console.log('Error @ GET /movies', err))
})

// GET /movies/:movieId
router.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params
  Movie
    .findById(movieId)
    .populate("cast")
    .then((movie) => res.render("movies/movie-details.hbs", { movie }))
    .catch((err) => console.log("Error @ GET /movies/:movieId", err))
})

// POST /movies/:movie/delete
router.post('/:movieId/delete', (req, res, next) => { 
  const { movieId } = req.params
  Movie
    .findByIdAndDelete(movieId)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log("Error @ POST /movies/:movieId/delete", err))
})

// GET movies/:movieId/edit
router.get('/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params
  Movie
    .findById(movieId)
    .populate('cast')
    .then(movie => {
      // @ts-ignore
      const { cast } = movie

      Celebrity
        .find({_id: {$nin: cast}}) // Filters and pass actors that are not in movie.cast
        .then(celebrities => {
          console.log(celebrities)
          res.render("movies/edit-movie.hbs", { movie, celebrity: celebrities })
        })
        .catch((err) => console.log("Error @ GET /movies/:movieId/edit", err))
    })
})

// POST movies/:movieId/edit
router.post('/:movieId/edit', (req, res, next) => { 
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
