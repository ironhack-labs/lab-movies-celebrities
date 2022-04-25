const Celebrity = require('../models/Celebrity.model');

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});
router.post('/celebrities/create', (req, res, next) => {
  // parses these out the body
  const { name, occupation, catchPhrase } = req.body;

  //  this returns a promise which then we can use it
  Celebrity.create({ name, occupation, catchPhrase })

    //  this is our callback, whatever is inside the then
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('celebrities/new-celebrity');
      next(error);
    });
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    //  returns this as an array so we have to pass it as a object
    .then((celebritydB) => {
      console.log('retrieved data', { celebs: celebritydB });
      res.render('celebrities/celebrities', { celebs: celebritydB });
    })
    .catch((err) => {
      console.log(err);
      next(error);
    });
});

module.exports = router;
