// > routes/celebrities.routes.js
const express = require('express');
const router = express.Router();

// require Model
const Celebrity = require('../models/Celebrity.model');


// GET - List of all celebrities
router.get('/celebrities', async(req, res, next) => {
  try {
    const celebritiesData = await Celebrity.find();
    console.log(celebritiesData)
    // we have to send the object, and I put a key: { celebrities: arrayfromDB }
    res.render('celebrities/all', {celebrities: celebritiesData})
  } catch(error) {
    console.error('Error while creating the celebrity', error);
    next(error)
  }
})

// GET - CREATE a Celebrity
router.get('/celebrities/create', async(req, res, next) => {
  try {
    res.render('celebrities/new-celebrity');

  } catch(error) {
    console.error('Error while creating the celebrity', error);
    next(error)
  }
})

// POST - CREATE a celebrity
// localhost:3000/celebrities/create
router.post('/celebrities/create', async(req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    //res.send(req.body)
    const create = await Celebrity.create({ name, occupation, catchPhrase })
    res.redirect('/celebrities')
  } catch(error) {
    console.error('Error while creating the celebrity', error.message);
    res.render('celebrities/new-celebrity');
    next(error)
  }
});


// GET - Show details
router.get('/celebrities/:id', async(req, res, next) => {
  try {
    const { id } = req.params;
    const celebrity = await Celebrity.findById(id);
    //console.log(movie);
    res.render("celebrities/celebrity-details",  celebrity );
  } catch(error) {
    console.error('Error while showing celebrity', error);
    res.render('celebrities/all');
    next(error)
  }
})


// POST - Delete
router.post('/celebrities/:id/delete', async(req, res, next) => {
  try {
    const { id } = req.params;
    //res.send(id);
    const celebrityDelele = await Celebrity.findByIdAndRemove(id);
    res.redirect('/celebrities')
  }
  catch(error) {
  console.error('Error deleting sending movie to DB', error);
  res.render('/');
  next(error)
  }
});

// Show the form to Edit a Movie
router.get('/celebrities/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const {id} = req.params;
    //res.send(id)
    const celebrity = await Celebrity.findById(id);
    res.render('celebrities/edit-celebrity', celebrity );

  } catch (error) {
    console.log('Error while getting the movies from the DB: ', error);
    // Call the error-middleware to display the error page to the user
    next(error);
  }
});

// Post - fill out the form with the information
router.post('/celebrities/:id/edit', async (req, res, next) => {
  
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  console.log(name, occupation, catchPhrase);
  //res.send(req.body)
  const updateCelebrity = await Celebrity.findByIdAndUpdate(
    id,
    { name, occupation, catchPhrase },
    { new: true }
  );
  console.log("updated", updateCelebrity);
  res.redirect(`/celebrities/${id}`);
  
});



module.exports = router;