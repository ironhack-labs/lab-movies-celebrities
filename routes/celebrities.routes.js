const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('celebrities/celebrities', { celebrities });
  } catch (err) {
    console.log(`Err while getting the posts from the DB: ${err}`);
    next(err);
  }
});

router.get('/create', async function (req, res, next) {
  try {
    res.render('celebrities/new-celebrity');
  } catch (error) {
    console.log(`There was a problem : ${error.message}`);
    next(error);
  }
});
router.post('/create', async function (req, res, next) {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('/celebrities');
  } catch (err) {
    res.render('celebrities/new-celebrity');
  }
});

module.exports = router;
