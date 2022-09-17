const { application } = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


// all your routes here

router.get('/movies/create', (req, res, next) => {
  Celebrity.find()
  .then((celebFromDb) => {
    res.render('./movies/new-movie', {celebrity: celebFromDb});
  })
  .catch(err => {
    console.log(err)
  })
});


router.post('/movies/create', (req, res, next) => {
  console.log({info: req.body})
    const movieToCreate = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

  Movie.create(movieToCreate)
  .then(() => {
    
      res.redirect("/movies");
  }).catch(err => {
      console.log(err);
  })
});


router.get('/movies', (req, res, next) => {
  Movie.find()
  .then((movieFromDb) => {
    data = {
      movie: movieFromDb
    }
    res.render('movies/movies', data)
  })
  .catch(err => {
    console.log(err)
  })
});



router.get('/movies/:id', (req, res, next) => {
  console.log('The ID from the URL is: ', req.params);
  Movie.findById(req.params.id).populate('cast')
  .then(theMovie => res.render('movies/movie-details', {movie: theMovie}))
  .catch(err => console.log('Error while retrieving movie details: ', err));
  
});


router.get('/movies/:id/edit', (req, res, next) => {
  
  
  Celebrity.find()
  .then((celebFromDb) => {
    Movie.findById(req.params.id)
  .then((movieFromDb) => {
    data = {
      movie: movieFromDb,
      celebrities: celebFromDb
    }
    res.render('movies/edit-movie', data);
  })
    
  })
  .catch(err => {
    console.log(err)
  })
});

router.post('/movies/:id/edit', (req, res, next) => {
  movieToUpdate = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
  }

  Movie.findByIdAndUpdate(req.params.id, movieToUpdate)
  .then((updatedMovie) => {
    res.redirect(`/movies/${updatedMovie.id}`);
  })
  .catch(err => {
    console.log(err)
  })
})


router.post('/movies/:id/delete', (req, res, next) => {
  
  
  Movie.findByIdAndDelete(req.params.id)
  .then(() => {res.redirect('/movies')})
  .catch(err => console.log(err));
});





module.exports = router;