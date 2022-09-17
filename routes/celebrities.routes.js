const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');

// Iteration #3
router.get('/celebrities/create', async (req, res) => {
  try {
    res.render('celebrities/new-celebrity');
  } catch (err) {
    console.log(err);
  }
});

// Create  celebrities
router.post('/celebrities/create', async (req, res) => {
  await Celebrity.create(req.body);
  try {
    res.redirect('/celebrities');
  } catch (err) {
    console.log(err);
    res.redirect('/celebrities/create');
  }
});

// Iteration #4
// Listing all celebrities
router.get('/celebrities', async (req, res) => {
  const celebrityData = await Celebrity.find();
  try {
    res.render('celebrities/celebrities', { celebrity: celebrityData });
  } catch (err) {
    console.log(err);
    res.redirect('/celebrities/create');
  }
});

// Iteration 11
// Celebrity detail page
router.get('/celebrities/:id', async (req, res) => {
  const celebrityData = await Celebrity.findById(req.params.id);
  try {
    res.render('celebrities/celebrity-detail', { celebrity: celebrityData });
  } catch (err) {
    console.log(err);
  }
});

// Iteration 12
// Delete celebrities
router.post('/celebrities/:id/delete', async (req, res) => {
  await Celebrity.findByIdAndDelete(req.params.id);
  try {
    res.redirect('/celebrities');
  } catch (err) {
    console.log(err);
  }
});

// Iteration 13
// Edit celebrities
router.get('/celebrities/:id/edit', async (req, res) => {
  const celebrityData = await Celebrity.findById(req.params.id);
  try {
    res.render('celebrities/edit-celebrity', { celebrity: celebrityData });
  } catch (err) {
    console.log(err);
  }
});

router.post('/celebrities/:id', async (req, res) => {
  await Celebrity.findByIdAndUpdate(req.params.id, req.body);
  try {
    res.redirect('/celebrities');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
