// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
      Celebrity.create({ name, occupation, catchPhrase })
      .then(() => res.redirect('/celebrities'))
      .catch(error => next(error));
  });

  router.get('/celebrities', (req, res) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        console.log(celebritiesFromDB);
      res.render('celebrities/celebrities', { celebrities: celebritiesFromDB }); 
    })
    .catch(error => {
      console.log('Error while getting the drones from the DB: ', error);
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router;