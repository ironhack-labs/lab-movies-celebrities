const router = require('express').Router()
const Celeb = require('../../models/Celebrity.model')
const Movies = require('../../models/Movie.model')

router.get('/movies/create', (req, res) => {
  Celeb.find()
    .then(celebs => res.render('movies/create-movie', { celebs }))
    .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {
  let { title, genre, plot, celebIds } = req.body

  celebIds = celebIds.split(',')
  console.log(celebIds)
  if (plot === '') plot = undefined

  const errorMsg = `One celebrity is required! <a href='/celebrities/create' class="text-info">create</a> one if needed.`

  if (!celebIds) res.render('movies/create-movie', { error: errorMsg })

  Movies.create({ title, genre, plot })
    .then(movie => {
      celebIds.forEach(id => {
        Movies.findByIdAndUpdate(movie._id, { $push: { cast: id } })
          .then(movieUpdated => res.redirect('/movies'))
          .catch(err => console.log(err))
      })
    })
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

router.post('/movie/:filmId/edit', (req, res) => {
  const { filmId } = req.params

  let celebIds = req.query.id.split('?id=')
  // res.send(celebIds)

  Movies.findById(filmId)
    .populate('cast')
    .then(movie => movie)
    .then(movie => {
      // he seleccionado manualmentre
      Celeb.find({ _id: { $ne: celebIds[0] } })
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
