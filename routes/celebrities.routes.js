// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model.js');

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create', (req, res, next) => {
  const { celebrity } = req.body;
  Celebrity.find()

    .then()

    .catch();
});

module.exports = router;
