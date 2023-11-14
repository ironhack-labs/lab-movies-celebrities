// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity', { title: 'Create Celebrity' });
  });


  router.post('/create', async (req, res) => {
    try {
      const { name, occupation, catchPhrase } = req.body;
      const newCelebrity = await Celebrity.create({ name, occupation, catchPhrase });

      res.redirect('/celebrities');
    } catch (error) {
      res.render('celebrities/new-celebrity', { title: 'Create Celebrity', errorMessage: 'Error creating celebrity.' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const celebrities = await Celebrity.find();
      res.render('celebrities/celebrities', { title: 'All Celebrities', celebrities });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;