const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// Render the create celebrity form
router.get('/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});

// Handle form submission
router.post('/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch(() => res.render('celebrities/new-celebrity'));
});

router.get('/', (req, res) => {
    Celebrity.find()
      .then((celebrities) => res.render('celebrities/celebrities', { celebrities }))
      .catch((err) => console.error(err));
  });
  module.exports = router;