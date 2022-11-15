const Celebrities = require('../models/Celebrity.model');

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

// all your routes here



router.get('/celebrities/create', (req, res, next) =>
  res.render('celebrities/new-celebrity')
);

router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrities.create({ name, occupation, catchPhrase })
    .then(() => {
      console.log('working')
      res.redirect('/celebrities')
    })
    .catch(() => res.render('celebrities/new-celebrity'));
});

router.get('/celebrities', (req, res, next) => {
  Celebrities.find()
    .then((allTheCelebritiesFromDB) => {
      res.render('celebrities/celebrities.hbs', {
        celebrities: allTheCelebritiesFromDB,
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
