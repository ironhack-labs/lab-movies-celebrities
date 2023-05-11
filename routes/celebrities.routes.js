const router = require('express').Router();
const Celeb = require('../models/Celebrity.model');

// all your routes here

//create celebs

router.get('/celebrities/create', (req, res, next) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celeb.create({ name, occupation, catchPhrase });
    res.redirect('/celebrities');
  } catch (error) {
    //render again this
    console.log(error);
    next(error);
  }
});

//see all celebs and celebs details

router.get('/celebrities', async (req, res, next) => {
  try {
    const allCelebs = await Celeb.find();
    res.render('celebrities/celebrities', { allCelebs });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/celebrities/:id', async (req, res, next) => {
  const celebId = req.params.id;
  try {
    const selectedCeleb = await Celeb.findById(celebId);
    res.render('celebrities/celebrity-details', selectedCeleb);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Update celebs
router.get('/celebrities/edit/:id', async (req, res, next) => {
  const celebId = req.params.id;
  try {
    const pickedCeleb = await Celeb.findById(celebId);
    res.render('celebrities/edit-celebrity', pickedCeleb);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/celebrities/edit/:id', async (req, res, next) => {
  const celebId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  try {
    const pickedCeleb = await Celeb.findByIdAndUpdate(celebId, { name, occupation, catchPhrase });
    res.redirect(`/celebrities/${celebId}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//delete celebs 
router.post('/celebrities/delete/:id', async (req, res, next) => {
  const celebId = req.params.id;
  try {
    await Celeb.findByIdAndRemove(celebId);
    res.redirect('/celebrities');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
