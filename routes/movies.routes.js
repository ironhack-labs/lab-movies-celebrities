//const express = require('express');
//const router = express.Router();
const router = require("express").Router();
// require Model
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model") // to get all the celebrities



// CRUD - Create - GET -> show the form, 
// find() celebrities to put valueID as options
// GET - Create a Movie
router.get('/movies/create', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find().populate('cast'); // Array
    //console.log(celebritiesArr);// array
    // pass into {} --> to be an object --> { celebritiesArr }
    res.render('movies/new-movie', { celebrities } ); // passed celebrities Id as value, to select one
  } catch(error) {
    console.error('Error while creating the movie', error);
    next(error)
  }
})

// CRUD - Create - POST -> send info to MongoDB
// POST - Send information to DB
router.post('/movies/create', async (req, res, next) => {
  try {
    //res.send(req.body);
    const { title, genre, plot, cast } = req.body;
    //const newMovie = await Movie.create({title, genre, plot, cast});
    await Movie.create({title, genre, plot, cast});
    res.redirect('/movies');
    
  } catch(error) {
    console.error('Error while sending movie to DB', error);
    res.render('movies/new-movie');
    next(error)
  }
})

// CRUD - UPDATE - findById - req.params
// Show the form to Edit a Movie
router.get('/movies/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const {id} = req.params;
    //res.send(id)
    const movie = await Movie.findById(id).populate('cast');
    const actors = await Celebrity.find();// find all, this returns an Array
        // iterate over 'actors' and find the movie.cast.id
    actors.forEach(actor => {
      // movie.cast --> array with ._id
      //console.log(`ACTOR: ${actor}`)
      //console.log(`CAST: ${movie.cast}`) // [{name, _id, ...}, {}, {}]
      // Need an array only with IDs to compare with each actor._id
      const castIds = movie.cast.map(member => member._id); // array with only ids
      // compare array of castIds with each actor._id, and add a property
      if(castIds.includes(actor._id)) {
        actor.includedInCast = true; // add a property, then add 'selected' in options
      }
    });
    res.render('movies/edit-movie', { movie, actors });

  } catch (error) {
    console.log('Error while getting the movies from the DB: ', error);
    // Call the error-middleware to display the error page to the user
    next(error);
  }
});

// CRUD - UPDATE - findByIdAndUpdate - req.params, req.body
// Post - fill out the form with the information
router.post('/movies/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params; // first argument -> in findByIdAndUpdate(id)
    const { title, genre, plot, cast } = req.body; // second argument -> in findByIdAndUpdate(id)
  
    //console.log(title, genre, plot, cast);
    //res.send(req.body)
    const updateMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, plot, cast },
      { new: true }
    );
    //console.log("updated", updateMovie);
    //res.redirect(`/movies/${id}`);
    res.redirect('/movies');

  } catch (error) {
    console.log('Error while getting the movies from the DB: ', error);
    // Call the error-middleware to display the error page to the user
    next(error);
  }
});


// POST - Delete
router.post('/movies/:id/delete', async (req, res, next) => {
  try {
    const { id } = req.params;
    //res.send(id);
    await Movie.findByIdAndRemove(id);
    res.redirect('/movies');
  }
  catch(error) {
  console.error('Error deleting sending movie to DB', error);
  res.render('/');
  next(error)
  }
});

// CRUD - READ - GET-> findById(id)
// GET - Show details
router.get('/movies/:movieId', async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate('cast');
    // findById(id) --> returns an object, we don't need brackets
    //console.log(movie);
    res.render("movies/movie-details",  movie );
  } catch(error) {
    console.error('Error while sending movie to DB', error);
    res.render('movies/all');
    next(error)
  }
})

// CRUD - READ - GET-> find()
// GET - List of all celebrities
router.get('/movies', async (req, res, next) => {
  try {
    const movies = await Movie.find(); // Array
    //console.log(moviesData); // array, and handlebars need an object --> { moviesData }
    res.render('movies/all', { movies });
  } catch(error) {
    console.error('Error while creating the celebrity', error);
    next(error)
  }
})

module.exports = router;


