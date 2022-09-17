const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');

// all your routes here
// Not sure about that yet
router.get('/celebrities', (req, res, next) => {
  res.render('celebrities/celebrities');
});

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
  Celebrity.create(req.body)
    .then(() => {
      res.redirect('/celebrities');
      console.log('celeb created!!!');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/celebrities/create');
    });
});

module.exports = router;
