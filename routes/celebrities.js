const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// ************ //
// ROUTES BELOW 
// ************ //

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity.hbs');
});


router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body
  
  Celebrity.create( { name, occupation, catchPhrase } )
    .then(() => {
      console.log('celebrity created successfully')
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log('Error creating celebrity')
      res.render('celebrities/new-celebrity.hbs');
    })
});

router.get('/celebrities', (req, res, next ) => {

  Celebrity.find()
    .then(foundCelebrities => {
      res.render('celebrities/celebrities.hbs', { celebrity: foundCelebrities })
    })
    .catch(err => {
      console.log(`Error finding celebrities:`, err);
    })
});



















module.exports = router;