const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

// /celebrities/create GET route
router.get('/create', (req, res) => {
  res.render('celebrities/new-celebrity');
});

// /celebrities/create POST route
router.post('/create', async (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('/celebrities');
  } catch (error) {
    res.render('celebrities/new-celebrity', { errorMessage: 'Error while creating the celebrity. Please try again.' });
  }
});

// /celebrities GET route
router.get('/', async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('celebrities/celebrities', { celebrities });
  } catch (error) {
    res.render('error', { errorMessage: 'Error while retrieving celebrities.' });
  }
});

// /celebrities/:id GET route - Show details of a specific celebrity
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const celebrity = await Celebrity.findById(id);
    res.render('celebrities/celebrity-details', { celebrity });
  } catch (error) {
    res.render('error', { errorMessage: 'Error while retrieving celebrity details.' });
  }
});

// /celebrities/:id/edit GET route - Show edit form for a specific celebrity
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;

  try {
    const celebrity = await Celebrity.findById(id);
    res.render('celebrities/edit-celebrity', { celebrity });
  } catch (error) {
    res.render('error', { errorMessage: 'Error while retrieving celebrity details.' });
  }
});

// /celebrities/:id/edit POST route - Update a specific celebrity
router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase });
    res.redirect(`/celebrities/${id}`);
  } catch (error) {
    res.render('celebrities/edit-celebrity', { errorMessage: 'Error while updating the celebrity.', celebrity: { _id: id, name, occupation, catchPhrase } });
  }
});

// /celebrities/:id/delete POST route - Delete a specific celebrity
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    await Celebrity.findByIdAndRemove(id);
    res.redirect('/celebrities');
  } catch (error) {
    res.render('error', { errorMessage: 'Error while deleting the celebrity.' });
  }
});

module.exports = router;
