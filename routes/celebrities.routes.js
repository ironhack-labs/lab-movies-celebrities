// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const router = express.Router();

router.get('/', (req, res, next) => {
  Celebrity.find({})
  .then(celebrities => {    
    res.render('celebrities/index', { celebrities });
  })
  .catch(error => next(error))
})

router.get('/new', (req, res) => {
  res.render('celebrities/new');
})

// req.body
router.post('/', (req, res, next) => {
  // const name = req.body.name
  // const age = req.body.age
  //...
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
  // .save()
  .then(() => {
    console.log(req.body)
    res.redirect('celebrities')
  })
  .catch(error => {
    res.render('celebrities/new', { error })
  })
})

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findOne({ _id: id })
  .then(celebrity => {
    res.render('celebrities/edit', { celebrity });
  })
  .catch(error => next(error))
})

router.post('/:id/edit', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const { id } = req.params;

  Celebrity.findOneAndUpdate({ _id: id }, { name, occupation, catchPhrase })
  .then(() => { 
    res.redirect('/celebrities/');
  })
  .catch(error => next(error))
})

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove({ _id: id })
  .then(() => {
    res.redirect('/celebrities/');
  })
  .catch(error => next(error))
})


router.get('/:id', (req, res, next) => {
  // const id = req.params.id;
  const { id } = req.params;
  // this CONTROLLER is...
  Celebrity.findOne({ _id: id }) // ... asking for data from the Celebrity MODEL and ...
    .then(celebrity => {
      res.render('celebrities/show', { celebrity }); // ... sending a VIEW to the client
    })
    .catch(error => next(error))
})


module.exports = router;