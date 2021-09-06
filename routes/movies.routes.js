// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
require('./index')
require("dotenv/config")
const Movie = require("../models/Movie.model");
// all your routes here


router.get('/movies/crear', (req, res) => {
    res.render('./../views/movies/new-movie')
    
    
})

  router.post('/movies/crear', (req, res) => {
  
    const {title, genre, plot, cast} = req.body
  
    Movie
      .create(req.body)
      .then(movies => res.redirect('/movies/lista'))
      .catch(err => console.log(err))
      
  })

  router.get('/movies/lista', (req, res) => {

    Movie
      .find()
      .select('title')
      .then(Movie => res.render('./../views/movies/movies.hbs', {Movie}))
      .catch(err => console.log(err))
  })

  router.get('/movies/details', (req, res) => {

    const { Movie_id } = req.query
  
    Movie
      .findById(Movie_id)
      .then(theMovie => res.render('./../views/movies/movie-details.hbs', theMovie))
      .catch(err => console.log(err))
  })





module.exports = router;
