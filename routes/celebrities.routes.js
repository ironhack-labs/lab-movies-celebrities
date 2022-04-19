const Celebrity = require('../models/Celebrity.model');

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});
router.post('/celebrities/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })

    .then(() => {
      res.render('celebrities/new-celebrity');
      res.redirect('/celebrities');
    })
    .catch((error) => next(error));
});

router.get('/celebrities', (req, res) => {
  Celebrity.find()
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
