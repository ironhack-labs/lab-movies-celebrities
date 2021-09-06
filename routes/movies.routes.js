// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie= require('./../models/Movie.model')
const Celebrity= require('./../models/Celebrity.model');
const { find } = require("./../models/Movie.model");

// MOVIE CREATE 
router.get('/create', (req, res) => {

    Celebrity
    .find()
    .then(celeb => res.render('movies/new-movie', {celeb}))
    .catch(err => console.log(err))
})
router.post('/create', (req, res) => {
    
    const { title, genre, plot, cast } = req.body

    Movie
    .create({ title, genre, plot, cast })
    .then(theMovie => res.redirect('/movies'))
    .catch(err => console.log(err))
    
})

// MOVIE LIST
router.get('/', (req, res) => {

    Movie
    .find()
    .then(movies => res.render('movies/movies', {movies}))
    .catch(err => console.log(err))
 })

// MOVIE DETAIL
router.get('/:id', (req, res) => {
   
    const { id } = req.params
    
  
     Movie
     .findById(id)
     .populate('cast')
     .then(theMovie => res.render('movies/movie-details', theMovie))
     .catch(err => console.log(err))
  })

// MOVIE DELETE 
router.post('/delete', (req, res) => {
    
    const { id } = req.params

       Movie
      .findByIdAndRemove(id)
      .then(theMovie => res.redirect('/movies'))
      .catch(err => console.log(err))
 })

// // MOVIE EDIT 
// router.post('/movies/:id/edit', (req, res) => {

//     const { movie_id } = req.params

//     Movie
//     .findById(movie_id)
//     .then(theMovie => res.render('movies/edit-movie',theMovie))
//     .catch(err => console.log(err))

//     Celebrity
//     .find()
 //})



 module.exports = router;
