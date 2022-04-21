const router = require("express").Router();               // <- WE'VE STORED A MIDDLEWARE IN 'Router' VARIABLE
const Celebrity = require('../models/Celebrity.model');   // <- GOT TO IMPORT THE MODELS WE PLAN TO USE

// ************ //
// ROUTES BELOW 
// ************ //


router.get('/celebrities/create', (req, res, next) => {  
  res.render('celebrities/new-celebrity.hbs');
});


router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body

  Celebrity.create( { name, occupation, catchPhrase } )
    .then(createReturn => {                                         
      console.log('celebrity created successfully', createReturn)
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log('Error creating celebrity')
      res.render('celebrities/new-celebrity.hbs');
    })
});


router.get('/celebrities', (req, res, next ) => {

  Celebrity.find()
    .then(foundCelebrities => {                                                     // <- this return is an array
      res.render('celebrities/celebrities.hbs', { celebrity: foundCelebrities })
    })
    .catch(err => {
      console.log(`Error finding celebrities:`, err);
    })
});

module.exports = router;