const router = require('express').Router()
const Celeb = require('../../models/Celebrity.model')
const Movies = require('../../models/Movie.model')

router.get('/movies/create', (req, res) => {
  Celeb.find()
    .then(celebs => res.render('movies/create-movie', { celebs }))
    .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {
  // res.send(req.body)
  let { title, genre, plot, celebId } = req.body

  if (plot === '') plot = undefined

  Movies.create({ title, genre, plot, cast: celebId })
    .then(movie => res.redirect('/movies'))
    .catch(err => console.log(err))
})

// Show list of movies

router.get('/movies', (req, res) => {
  Movies.find()
    .then(movies => res.render('movies/movies', { movies }))
    .catch(err => console.log(err))
})

// details of movie

router.get('/movie/:id', (req, res) => {
  const { id } = req.params

  Movies.findById(id)
    .populate('cast')
    .then(movie => res.render('movies/movie-details', { movie }))
    .catch(err => console.log(err))

  // res.send(req.params)
})

// delete movie

router.post('/movie/:id/delete', (req, res) => {
  const { id } = req.params

  Movies.findByIdAndRemove(id)
    .then(movie => res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.post('/movie/:filmId/edit/:celebId', (req, res) => {
  const { filmId, celebId } = req.params

  Movies.findById(filmId)
    .populate('cast')
    .then(movie => movie)
    .then(movie => {
      Celeb.find({ _id: { $ne: celebId } })
        .then(celebs => {
          res.render('movies/edit-movie', { movie, celebs })
        })
        .catch(err => console.log(err))
    })

    .catch(err => console.log(err))
})

// update movie iteracion 10
router.post('/movie/:id', (req, res) => {
  const { title, genre, plot, celebId } = req.body
  const cast = celebId
  const { id } = req.params

  Movies.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(movie => res.redirect(`/movie/${id}`))
    .catch(err => console.log(err))
})

module.exports = router
