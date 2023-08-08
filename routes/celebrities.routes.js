// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model.js');

// all your routes here
// ITERATION 3
router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});
router.post('/celebrities/create', async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;

    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('/celebrities');
  } catch (error) {
    res.redirect('/celebrities/new-celebrity');
    console.log(error);
  }
});

// ITERATION 4
router.get('/celebrities', async (req, res) => {
  try {
    let celebritiesFromDB = await Celebrity.find();
    res.render('celebrities/celebrities.hbs', {
      celebrities: celebritiesFromDB,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
