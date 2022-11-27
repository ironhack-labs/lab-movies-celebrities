// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const express = require('express');
const Movies = require('../models/Movie.model');
const router = express.Router();

router.get('/', (req, res, next) => {
  Movies.find({})
  .then(movies => {    
    res.render('movies/index', { movies });
  })
  .catch(error => next(error))
})

router.get('/new', (req, res) => {
  res.render('movies/new');
})

// req.body
router.post('/', (req, res, next) => {
  // const name = req.body.name
  // const age = req.body.age
  //...
  const { title, genre, plot } = req.body;
  Movies.create({ title, genre, plot })
  // .save()
  .then(() => {
    console.log(req.body)
    res.redirect('movies')
  })
  .catch(error => {
    res.render('movies/new', { error })
  })
})

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Movies.findOne({ _id: id })
  .then(movie => {
    res.render('movies/edit', { movie });
  })
  .catch(error => next(error))
})

router.post('/:id/edit', (req, res, next) => {
  const { title, genre, plot } = req.body;
  const { id } = req.params;

  Movies.findOneAndUpdate({ _id: id }, { title, genre, plot })
  .then(() => { 
    res.redirect('/movies/');
  })
  .catch(error => next(error))
})

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Movies.findByIdAndRemove({ _id: id })
  .then(() => {
    res.redirect('/movies/');
  })
  .catch(error => next(error))
})


router.get('/:id', (req, res, next) => {
  // const id = req.params.id;
  const { id } = req.params;
  // this CONTROLLER is...
  Movies.findOne({ _id: id }) // ... asking for data from the Celebrity MODEL and ...
    .then(movie => {
      res.render('movies/show', { movie }); // ... sending a VIEW to the client
    })
    .catch(error => next(error))
})

module.exports = router;