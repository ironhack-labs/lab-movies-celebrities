/* const CelebrityModel = require("../models/Celebrity.model"); */

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


const Celebrity = require('../models/Celebrity.model');

// all your routes here

module.exports = router;

//ALL CELEBRITIES

router.get('/celebrities', (req, res, next) => {
    Celebrity.find() 
      .then((allCelebs) => res.render('celebrities/celebrities.hbs', { celebrities: allCelebs }))
      .catch((err) => {
        console.log('Error while creating the celebrity');
        next(err);
      });
  });


//CREATE A CELEBRITY

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
  });
  
  //Receive info from new-celebrity.hbs form and create celebrity

  router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
  
    Celebrity.create({ name, occupation, catchPhrase})
      .then((createdCeleb) => {
        console.log(`Created the celebrity ${createdCeleb.name}`);
        res.redirect('/celebrities');
        
      })
      .catch((err) => next(err));
  });
  