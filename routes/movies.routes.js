const express = require('express');
const router = express.Router();
// require Model
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model") // to get all the celebrities

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
    const newMovie = Movie.create({title, genre, plot, cast});
    res.redirect('/movies')
    
  } catch(error) {
    console.error('Error while sending movie to DB', error);
    res.render('movies/new-movie');
    next(error)
  }
})

module.exports = router;