const express = require('express');
const Celebrity = require('../models/celebrity.model');
const router = express.Router();

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      res.render('celebrities/celebrities', {
        celebrities: celebritiesFromDb,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;


