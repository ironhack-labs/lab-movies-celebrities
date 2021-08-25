const router = require('express').Router();
const Celebrities = require('../models/Celebrity.model');

/*************************************************
 * The GET router to get all the celebrities listed *
 ************************************************/
router.get('/', (req, res) => {
  Celebrities.find()
    .then((celebFromDB) => {
      console.log(`Celebrities from DB: ${celebFromDB}`);
      res.render('celebrities/celebrities', { celebFromDB });
    })
    .catch((err) => {
      console.log(`Celebrities were not retirved from the DB: ${err}`);
    });
});

/*****************************************************
 * The GET router to get the form to add a celebrity *
 *****************************************************/
router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});

/******************************************************
 * The POST router to get the form to add a celebrity *
 ******************************************************/
router.post('/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrities.create({
    name,
    occupation,
    catchPhrase,
  })
    .then((createdCeleb) => {
      console.log(`The celebrity was added: ${createdCeleb}`);
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log(
        `Error appeared when creating the celebrity, trying again... \n${err}`
      );
      res.redirect('/celebrities/create');
    });
});

module.exports = router;
