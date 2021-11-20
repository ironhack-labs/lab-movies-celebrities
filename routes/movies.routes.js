const express = require('express');
const router = express.Router();
// require Model
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model") // to get all the celebrities


// GET - List of all celebrities
router.get('/movies', async (req, res, next) => {
  try {
    const moviesData = await Movie.find();
    //console.log(moviesData); // array, and handlebars need an object --> { moviesData }
    res.render('movies/all', { movies: moviesData });
  } catch(error) {
    console.error('Error while creating the celebrity', error);
    next(error)
  }
})

// GET - Create a Movie
router.get('/movies/create', async(req, res, next) => {
  try {
    const celebritiesArr = await Celebrity.find();
    console.log(celebritiesArr);// array
    // pass into {} --> to be an object --> { celebritiesArr }
    res.render('movies/new-movie', { celebritiesArr } );

  } catch(error) {
    console.error('Error while creating the movie', error);
    next(error)
  }
})

// POST - Send information to DB
router.post('/movies/create', async(req, res, next) => {
  try {
    //res.send(req.body);
    const {title, genre, plot, cast} = req.body;
    const newMovie = await Movie.create({title, genre, plot, cast});
    res.redirect('/movies')
    
  } catch(error) {
    console.error('Error while sending movie to DB', error);
    res.render('movies/new-movie');
    next(error)
  }
})

// GET - Show details
router.get('/movies/:movieId', async(req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate('cast');
    //console.log(movie);
    res.render("movies/movie-details",  movie );
  } catch(error) {
    console.error('Error while sending movie to DB', error);
    res.render('movies/all');
    next(error)
  }
})


// POST - Delete
router.post('/movies/:id/delete', async(req, res, next) => {
  try {
    const { id } = req.params;
    //res.send(id);
    const movieDelele = await Movie.findByIdAndRemove(id);
    res.redirect('/movies')
  }
  catch(error) {
  console.error('Error deleting sending movie to DB', error);
  res.render('/');
  next(error)
  }
});

// Show the form to Edit a Movie
router.get('/movies/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const {id} = req.params;
    //res.send(id)
    const movie = await Movie.findById(id).populate('cast');
    const actors = await Celebrity.find();
    res.render('movies/edit-movie', {movie, actors: actors});

  } catch (error) {
    console.log('Error while getting the movies from the DB: ', error);
    // Call the error-middleware to display the error page to the user
    next(error);
  }
});

// Post - fill out the form with the information
router.post('/movies/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
  
    console.log(title, genre, plot, cast);
    //res.send(req.body)
    const updateMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, plot, cast },
      { new: true }
    );
    console.log("updated", updateMovie);
    res.redirect(`/movies/${id}`);

  } catch (error) {
    console.log('Error while getting the movies from the DB: ', error);
    // Call the error-middleware to display the error page to the user
    next(error);
  }
});

module.exports = router;