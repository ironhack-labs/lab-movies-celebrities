const router = require("express").Router();

const Movie = require('./../models/Movies.model')
const Celebrity = require('./../models/Celebrity.model')




router.get('/movies/create', (req, res) => {

  Celebrity
    .find()
    .then((celebrityFromDB) => {
      res.render('movies/new-movie', { celebrityFromDB })
    })
    .catch(err => console.log(err))

})

router.post('/movies/create', (req, res) => {

  const { title, genre, plot, cast } = req.body

  Movie
    .create({ title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies`)
    })
    .catch(err => console.log(err))
})

router.get('/movies', (req, res) => {


  Movie
    .find()
    .populate('cast')
    .then(movie => {
      res.render('movies/movies', { movie })
    })
    .catch(err => console.log(err))
})

router.get('/movies/:movie_id', (req, res) => {

  const { movie_id } = req.params

  Movie
    .findById(movie_id)
    .populate('cast')
    .then(movieFromDB => {
      res.render('movies/movie-details', movieFromDB)
    })
    .catch(err => console.log(err))
})



router.post('/movies/:movie_id/delete', (req, res) => {

  const { movie_id } = req.params

  Movie
    .findByIdAndDelete(movie_id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))

})

router.get('/movies/:movie_id/edit', (req, res, next) => {
  const { movie_id } = req.params

  Movie
    .findById(movie_id)
    .populate('cast')
    .then(movie => {
      Celebrity
        .find()
        .then((celebrities) => {
          res.render('movies/edit-movie', { celebrities, movie })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
});

router.post('/movies/:movie_id/edit', (req, res, next) => {
  const { title, genre, plot } = req.body
  const { movie_id } = req.params

  Movie
    .findByIdAndUpdate(movie_id, { title, genre, plot })
    .then(() => res.redirect(`/movies`))
    .catch(err => console.log(err))
});








module.exports = router;

