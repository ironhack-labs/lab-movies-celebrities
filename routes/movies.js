const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// ************ //
// ROUTES BELOW 
// ************ //

router.get('/movie/create', (req, res, next) => {
  
  Celebrity.find()
    .then(foundCelebrities => {
      res.render('movies/new-movie.hbs', { celebrity: foundCelebrities })
    })
    .catch(err => {
      console.log(`Error finding celebrities:`, err);
    })
});




module.exports = router;