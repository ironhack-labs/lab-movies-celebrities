const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');
// all your routes here

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
  });

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body

    Celebrity.create({name, occupation, catchPhrase})
    .then((createdCelebrity) => {
      console.log(`Created the celebrity ${createdCelebrity.title}`);
      res.redirect('/celebrities/create');
    })
    .catch((err) => next(err));
});
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
      .then((allCelebrities) => res.render('celebrities/celebrities', {celebrities: allCelebrities}))
      .catch((err) => {
        console.log('Error while creating the Celebrity');
        next(err);
      });
  });


module.exports = router;