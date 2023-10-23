// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model.js');
const Movie = require('../models/Movie.model.js');

// all your routes here
// ITERATION 3 - create a new celebrity
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

// ITERATION 4 - Display all the celebrities
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

// BONUS:
// Display the Celebrity details
router.get('/celebrities/:celebrityId', async (req, res) => {
  try {
    const { celebrityId } = req.params;
    let foundCelebrity = await Celebrity.findById(celebrityId).populate(
      'movies'
    );
    res.render('celebrities/celebrity-details.hbs', {
      celebrity: foundCelebrity,
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a specific celebrity
router.post('/celebrities/:celebrityId/delete', async (req, res) => {
  const { celebrityId } = req.params;
  try {
    const removedCelebrity = await Celebrity.findByIdAndRemove(celebrityId);
    res.redirect('/celebrities');
  } catch (error) {
    console.log(error);
  }
});

// GET Route to display the form to update a specific Celebrity
router.get('/celebrities/:celebrityId/edit', async (req, res) => {
  try {
    const { celebrityId } = req.params;
    let foundCelebrity = await Celebrity.findById(celebrityId);
    let movies = await Movie.find();
    res.render('celebrities/edit-celebrity.hbs', {
      celebrity: foundCelebrity,
      movies,
    });
  } catch (error) {
    console.log(error);
  }
});

// POST Route to actually make updates on a specific Celebrity
router.post('/celebrities/:celebrityId/edit', async (req, res) => {
  try {
    // destructure the req.params object to get celebrityId
    const { celebrityId } = req.params;
    const { name, occupation, catchPhrase, movies } = req.body;

    // update the same document with new content
    await Celebrity.findByIdAndUpdate(
      celebrityId,
      { name, occupation, catchPhrase, movies },
      { new: true }
    );

    // redirect to celebrities list page
    res.redirect('/celebrities');
  } catch (error) {
    console.log(error);
  }
});
