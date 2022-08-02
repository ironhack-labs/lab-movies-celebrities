// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

const Movie = require('../models/Movie.model');

// all your routes here

module.exports = router;

//ALL MOVIES

router.get('/movies', (req, res, next) => {
    Movie.find() 
      .then((allMovies) => res.render('movies/movies.hbs', { movies: allMovies }))
      .catch((err) => {
        console.log('Error while creating the celebrity');
        next(err);
      });
  });


//CREATE A MOVIE

router.get('/movies/create', (req, res, next) => {

    Celebrity.find() 
    .then((allCelebs) => res.render('movies/new-movie.hbs', { celebrities: allCelebs }))

    .then(() =>res.render('movies/new-movie'));
  });
  
  //Receive info from new-movie.hbs form and create celebrity

  router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
  
    Movie.create({ title, genre, plot, cast})
      .then((createdMovie) => {
       /*  console.log(`Created the movie ${createdMovie.name}`); */
        res.redirect('/movies');
      })
      .catch((err) => next(err));
  });

//MOVIE DETAILS - bottom of the page!

router.get('/movies/:movieId', (req, res, next) => {
    const { movieId } = req.params;
    
  
    Movie.findById(movieId)
      .populate('cast')
      .then((movie) => {
        console.log(movie);
        
        res.render('movies/movie-details', movie);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  });
  
  //DELETE MOVIES

  //Route to delete the book
   router.get('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Movie.findByIdAndDelete(id)
      .then(() => res.redirect('/movies'))
      .catch((err) => next(err));
  });

  //EDIT MOVIES

  
router.get('/movies/:movieId/edit', (req, res, next) => {
    
    Celebrity.find() 
    .then((allCelebs) => res.render('movies/edit-movie', { celebrities: allCelebs }))
    .catch((err) => next(err));
    
    const { movieId } = req.params;

    Movie.findById(movieId)
    .then((movie) => res.render('movies/edit-movie', movie))
    .catch((err) => next(err));
      

   
       
     
  });
  
  //Post route that receives information from the edit form 

  router.post('/movies/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;
  
    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
      .then((movie) => res.redirect(`/movies/${movieId}`))
      .catch((err) => next(err));
  });
  