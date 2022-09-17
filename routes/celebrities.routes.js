const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');

// Iteration #3
// Show celebrities form
router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});

// Create  celebrities
router.post('/celebrities/create', (req, res, next) => {
  Celebrity.create(req.body)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/celebrities/create');
    });
});

// Iteration #4
// Listing all celebrities
router.get('/celebrities', (req, res, next) => {
  Celebrity.find().then((data) => {
    res.render('celebrities/celebrities', { celeb: data });
  });
});

module.exports = router;
