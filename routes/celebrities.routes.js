const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
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

//GET to see celebritie details/card
router.get('/:celebId', (req, res, next) => {
  const { celebId } = req.params;
  Celebrity.findById(celebId)
    .then((celebrityFromDB) => {
      res.render('celebrities/celebrity-details', celebrityFromDB);
    })
    .catch((err) => {
      console.log(`Something went wrong during getting the Celebrity: ${err}`);
      next(err);
    });
});

//GET to edit celebity, renders the form for submission
router.get('/:celebId/edit', (req, res, next) => {
  const { celebId } = req.params;
  Celebrity.findById(celebId)
    .then((foundCelebrity) => {
      res.render('celebrities/edit-celebrity', foundCelebrity);
    })
    .catch((err) => {
      console.log(`Smth went wrong while retrieving the celebrity: ${err}`);
      next(err);
    });
});

module.exports = router;
