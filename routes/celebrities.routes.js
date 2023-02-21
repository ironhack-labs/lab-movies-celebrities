// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here

//Celebrities
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/celebrities.hbs', { celebrities: celebrities });
    })
    .catch((error) => {
      console.log(error);
      res.render('error.hbs');
    });
});

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch((error) => {
      console.error(error);
      res.render('celebrities/new-celebrity.hbs');
    });
});

module.exports = router;
