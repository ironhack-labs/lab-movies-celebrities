const router = require('express').Router();

// all your routes here
const Celebrity = require('./../models/Celebrity.model');

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/celebrities', { celebrities });
    })
    .catch(err => console.error(err));
});

router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(req.body);

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      res.render('celebrities/new-celebrity', {
        errorMessage: 'Cannot create celebrity',
      });

      console.log(err);
    });
});

router.get('/', (req, res, next) => {
  res.render('celebrities/celebrities');
});

module.exports = router;
