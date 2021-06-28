const express = require('express');
const MovieModel = require('../models/Movie.model');
const router = express.Router();



router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie.hbs')
});

router.post('/movies/create', (req, res, next) => {
const {title, genre, plot, cast} = req.body
    console.log(req.body)
  MovieModel.create({title, genre, plot, cast})
      .then(() => {
       // send the user to the celebrities url
        res.redirect('/movies')
})
      .catch(() => {
       // if error
        res.render("movies/new-movie.hbs")
  })
});

router.get('/movies', (req, res, next) => {
      MovieModel.find()
      .then((movies) => {
          res.render('movies/movies.hbs', {movies})
  })
      .catch(() => {
            next('Movies fetch failed')
})
  });

  router.get('/movies/:id', (req, res, next) => {
    let dynamicMovieId = req.params.id
    MovieModel.findById(dynamicMovieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details.hbs", {movie})
    })
    .catch(() => {
      next('failed to find movie id')
    })
  });

router.post('/movies/:id/delete', (req, res, next) => {
// Iteration #5: Delete the drone
let dynamicMovieId = req.params.id

MovieModel.findByIdAndRemove(dynamicMovieId)
    .then(() => {
        res.redirect('/movies') 
    })
    .catch(() => {
        next('Deleting specific movie failed')
    })
})


router.get('/movies/:id/edit', (req, res, next) => {
    let dynamicMovieId = req.params.id
    MovieModel.findById(dynamicMovieId)
    .then((movie) => {
      res.render("movies/edit-movie.hbs", {movie})
    })
    .catch(() => {
      next('Finding specific movie failed')
    })
  });
  
  router.post('/movie/:id/edit', (req, res, next) => {
    // Iteration #4: Update the drone
    let dynamicMovieId = req.params.id
    const {name, genre, plot, cast} = req.body
  
    MovieModel.findByIdAndUpdate(dynamicMovieId, {name, genre, plot, cast})
      .then(() => {
        res.redirect("/movies")
})
    .catch(() => {
    res.render("movies/edit-movie.hbs", {movies})
})
  
});
  





module.exports = router;
