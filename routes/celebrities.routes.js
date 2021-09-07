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

module.exports = router;
