// > routes/celebrities.routes.js
const express = require('express');
const router = express.Router();

// require Model
const Celebrity = require('../models/Celebrity.model');


// GET - List of all celebrities
router.get('/celebrities', async(req, res, next) => {
  try {
    const celebritiesData = await Celebrity.find();
    console.log(celebritiesData)
    // we have to send the object, and I put a key: { celebrities: arrayfromDB }
    res.render('celebrities/all', {celebrities: celebritiesData})
  } catch(error) {
    console.error('Error while creating the celebrity', error);
    next(error)
  }
})

// GET - CREATE a Celebrity
router.get('/celebrities/create', async(req, res, next) => {
  try {
    res.render('celebrities/new-celebrity');

  } catch(error) {
    console.error('Error while creating the celebrity', error);
    next(error)
  }
})

// POST - CREATE a celebrity
// localhost:3000/celebrities/create
router.post('/celebrities/create', async(req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    //res.send(req.body)
    const create = await Celebrity.create({ name, occupation, catchPhrase })
    res.redirect('/celebrities')
  } catch(error) {
    console.error('Error while creating the celebrity', error.message);
    res.render('celebrities/new-celebrity');
    next(error)
  }
})

module.exports = router;