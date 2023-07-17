const router = require("express").Router();

const Movies = require('../models/Movies.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/movies/create', (req, res) => {
  Celebrity.find()
    .then(data => res.render('movies/new-movie', { data }))
    .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {
  const { title, genre, plot, cast, url } = req.body

  Movies.create({ title, genre, plot, cast, url })
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get('/movies', (req, res) => {
  Movies.find()
    .then(movies => res.render('movies/movies', { movies }))
    .catch(err => console.log(err))
})

router.get('/movies/:movieId', (req, res) => {
  const { movieId } = req.params

  Movies.findById(movieId)
    .populate('cast')
    .then(movies => res.render('movies/movie-details', movies))
    .catch(err => console.log(err))
})

router.post('/movies/:movieId/delete', (req, res) => {
  const { movieId } = req.params

  Movies.findByIdAndDelete(movieId)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get('/movies/:movieId/edit', (req, res) => {
  const { movieId } = req.params

  Movies.findById(movieId)
    .populate('cast')
    .then(movie => {
      Celebrity.find()
        .then(celebs => {
          const movieCast = movie.cast[0]
          const filterCelebs = celebs.filter(celeb => movieCast.name !== celeb.name)

          res.render('movies/edit-movie', { movie, movieCast, filterCelebs })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.post('/movies/:movieId/edit', (req, res) => {
  const { movieId } = req.params
  const { title, genre, plot, cast, url } = req.body

  Movies.findByIdAndUpdate(movieId, { title, genre, plot, cast, url })
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})

module.exports = router;