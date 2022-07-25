const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebDataArray => {
      console.log(celebDataArray);
      res.render('celebrities/celebrities', { celebs: celebDataArray })
    })
    .catch(err => console.log(err));
});

router.get('/celebrities/create', (req, res, next) => {
  // this should render a form to create a new celebrity
  res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
  // this chould create a new celebrity in our database

  console.log(req.body);

  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;

  // const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
    .then(newCelebrity => {
      console.log(newCelebrity);
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log(err);
      res.render('celebrities/new-celebrity');
    })


  // if error, re-render the form so that user can try again

  // if success, redirect to /celebrities
})

module.exports = router;