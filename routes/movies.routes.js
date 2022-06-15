const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


router.get('/movies/create',(req, res, next) => {
  Celebrity.find()
    .then(celebrityInfo => {
      res.render('../views/movies/new-movie.hbs',{celebrityInfo})
    })
})

router.post('/movies/create',(req, res, next) => {
  const {...movieInfo} = req.body
  Movie.create(movieInfo)
    .then(() => res.redirect('/movies'))
    .catch(err =>{console.log('Error while creating Movie:',err)
    next()
  })
})

router.get('/movies',(req, res, next)=>{
  Movie.find()
    .then(movies =>{
      res.render('../views/movies/movies.hbs',{movies})
    })
    .catch(err => {console.log('Error while rendering movies',err)
    next()
  })
})

router.get('/movies/:movieId',(req, res, next) =>{
  const {movieId} = req.params
  Movie.findById(movieId)
    .populate('cast')
    .then(theMovie => {
      res.render('../views/movies/movie-details.hbs',theMovie)
    })
    .catch(err => {
      console.log('Error while rendering details:',err)
      next()
    })
})

router.post('/movies/:id/delete',(req, res, next) =>{
  const {id} = req.params
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect('/movies'))
    .catch(error => {
      console.log('Error while deleting:',error)
      next()
    })
})

router.get('/movies/:id/edit',(req, res, next) =>{
  const {id} = req.params
  Movie.findById(id)
    .then(movieData => {Celebrity.find()
        .then(celebData => {
          res.render('../views/movies/edit-movie.hbs', {movieData, celebData})
        })
        .catch(error => {
          console.log('Error while editing',error)
          next()
        })
    })
})

router.post('/movies/:id/edit',(req, res, next) => {
  const {id} = req.params
  const {name, genre, plot, cast} = req.body

  Movie.findByIdAndUpdate(id, {name, genre, plot, cast})
    .then(() => {
      res.redirect(`/movies/${id}`)
    })
    .catch(error => {console.log(error)})
})



module.exports = router;


