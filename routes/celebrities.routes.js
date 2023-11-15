const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res) => {
  res.render('new-celebrity');
});
router.post('celebrities/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrityFromBD) => console.log(`New celebrity created: ${celebrityFromBD.name}`))
    .then(() => res.redirect('/celebrities'))
    .catch((error) => console.error(error).then(() => res.redirect('/new-celebrity')));
});

module.exports = router;
