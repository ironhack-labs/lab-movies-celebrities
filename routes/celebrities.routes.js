const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity').catch((error) => next(error));
});

router.post('/celebrities/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrityNew) => {
      console.log(`New celebrity created: `, celebrityNew);
      res.redirect('/celebrities');
    })
    .catch(() => res.render('celebrities/new-celebrity'));
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => res.render('celebrities/celebrities', { celebrities: celebritiesFromDb }))
    .catch((error) => next(error));
});

module.exports = router;
