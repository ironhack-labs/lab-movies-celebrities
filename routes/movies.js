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

router.get('/movies', (req, res, next ) => {

  Movie.find()
    .then(foundMovies => {
      res.render('movies/movies.hbs', { movie: foundMovies })
    })
    .catch(err => {
      console.log(`Error finding movies:`, err);
    })
});


module.exports = router;