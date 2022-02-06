const router = require('express').Router()
const Movies = require('../models/Movies.model')
const Celebrity = require('../models/Celebrity.model')
const req = require('express/lib/request')

// Handlebars.registerHelper('equals', function (a, b, opts) {
//   if (a === b) return opts.fn(this)
//   else return opts.inverse(this)
// })

router.get('/', (req, res) => {
  Movies.find().then((movies) => res.render('movies/movies', { movies }))
})

router.get('/create', (req, res) => {
  Celebrity.find()
    .then((celebs) => res.render('movies/new-movie', { celebs }))
    .catch((err) => console.log(err))
})

router.post('/create', (req, res) => {
  const { title, genre, plot, cast } = req.body
  Movies.create({ title, genre, plot, cast })
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})

//Details
router.get('/details/:id', (req, res) => {
  Movies.findById(req.params.id)
    .populate('cast')
    .then((movie) => {
      res.render('movies/movie-details', { movie })
    })
    .catch((err) => console.log(err))
})

//Delete
router.post('/:id/delete', (req, res) => {
  Movies.findByIdAndDelete(req.params.id)

    .then(res.redirect('/movies'))
    .catch((err) => console.log(err))
})

//Update
router.get('/:id/edit', (req, res) => {
  Movies.findById(req.params.id)
    .populate('cast')
    .then((movie) => {
      Celebrity.find().then((celebrities) => {
        res.render('movies/edit-movie', { movie, celebrities })
        //console.log({ movie, celebrities })
      })
    })
    .catch((err) => console.log(err))
})

router.post('/:id/edit', (req, res) => {
  //console.log(req.body)

  const { title, genre, plot } = req.body
  Movies.findByIdAndUpdate(req.params.id, { title, genre, plot })
    .then(() => res.redirect(`/movies/details/${req.params.id}`))
    .catch((err) => console.log(err))
})

module.exports = router
