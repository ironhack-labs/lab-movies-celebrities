const router = require("express").Router();

// require the Celebrity model here
const Celebrity = require('../models/Celebrity.model');

/* Iteration #3: Adding New Celebrities */
router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity
    .create({ name, occupation, catchPhrase  })
    .then(() => res.redirect('/celebrities'))
    .catch(error => next(error));
}); 


/* Iteration #4: Listing Our Celebrities */
router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .then((celebritiesDB) => {
          console.log('Retrieved drones from DB:', celebritiesDB);
          res.render('celebrities/celebrities.hbs', {celebrities: celebritiesDB});
        })
        .catch(error => {
          console.log('Error while getting the drones from the DB: ', error);
          next(error);
        });
    });

module.exports = router;
