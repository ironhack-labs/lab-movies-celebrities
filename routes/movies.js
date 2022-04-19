const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// ************ //
// ROUTES BELOW 
// ************ //

router.get('/movie/create', (req, res, next) => {
  
  Celebrity.find()
    .then(foundCelebrities => {
      res.render('movies/new-movie.hbs', { celebrity: foundCelebrities })
    })
    .catch(err => {
      console.log(`Error finding celebrities:`, err);
    })
});


router.post('/movie/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body
  console.log(req.body)

  Movie.create( { title, genre, plot, cast } )
    .then(() => {
      console.log('Movie created successfully')
      res.redirect('/movies');
    })
    .catch(err => {
      console.log('Error creating movie')
      res.render('celebrities/new-celebrity.hbs');
    })
});


router.post('/movies/:movieId', (req, res, next ) => {
  const { title, genre, plot, cast } = req.body
  const movieId = req.params.movieId

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast } )
    .then(() => {
      console.log('Movie updated successfully')
      res.redirect('/movies/' +movieId)
    })
    .catch(err => {
      console.log('Error updating movie')
    })
});


router.post('/movies/:movieId/delete', (req, res, next) => {
  const movieId = req.params.movieId

  Movie.findByIdAndRemove(movieId) 
    .then(() => {
      console.log('Movie removed successfully')
      res.redirect('/movies');
    })
    .catch(err => {
      console.log('Error removing movie')
    })
});


router.get('/movies', (req, res, next ) => {

  Movie.find()
    .then(foundMovies => {
      res.render('movies/movies.hbs', { movie: foundMovies })
    })
    .catch(err => {
      console.log(`Error finding movies:`, err);
    })
});


router.get('/movies/:movieId', (req, res, next ) => {
  const movieId = req.params.movieId

  Movie.findById(movieId)
    .populate('cast')
    .then(foundMovie => {
      console.log(foundMovie)
      res.render('movies/movie-details.hbs', { movie: foundMovie })
    })
    .catch(err => {
      console.log(`Error finding movies:`, err);
    })
});


router.get('/movies/:movieId/edit', (req, res, next ) => {
  const movieId = req.params.movieId
  let movie;

  Movie.findById(movieId)
    .populate('cast')
    .then(foundMovie => {
      movie = foundMovie
    })
    .then(getCelebs => {
      Celebrity.find()
      .then(foundCelebrities => {
        console.log(foundCelebrities, movie)
        res.render('movies/edit-movie.hbs', { celebrity: foundCelebrities, movie })
      })
      .catch(err => {
        console.log(`Error finding celebrities:`, err);
      })
    })
    .catch(err => {
      console.log(`Error finding movies:`, err);
    })
});


module.exports = router;