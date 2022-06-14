const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

// ---create---
router.get('/movies/create',(req, res, next) => {
  Celebrity.find()
    .then(celebrityInfo => {
      res.render('../views/movies/new-movie.hbs',{celebrityInfo})
    })
})
//---create---
router.post('/movies/create',(req, res, next) => {
  const {...movieInfo} = req.body
  Movie.create(movieInfo)
    .then(() => res.redirect('/movies'))
    .catch(err =>{console.log('Error while creating Movie:',err)
    next()
  })
})
//---read---
router.get('/movies',(req, res, next)=>{
  Movie.find()
    .then(movies =>{
      res.render('../views/movies/movies.hbs',{movies})
    })
    .catch(err => {console.log('Error while rendering movies',err)
    next()
  })
})

module.exports = router;