const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

// GET create new celebrity page
router.get('/create', (req, res, next) => {
  res.render('./celebrities/newCelebrity.hbs');
});

// POST create new celebrity
router.post('/create', async (req, res, next) =>{
  const {name, occupation, catchPhrase} = req.body;
  try {
    const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
    res.redirect('/celebrities');
  } catch (err) {
    res.render('./celebrities/newCelebrity.hbs');
  };
});

module.exports = router;
