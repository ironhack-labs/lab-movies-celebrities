// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

// Iteration #3: Adding New Celebrities

// GET route to display a form where the user is going to fill info about the celebrities that are going to be created

router.get('/celebrities/create', (req, res) =>  {

  res.render('celebrities/new-celebrity.hbs')
})

//POST route to submit info about the created celebrities

router.post('/celebrities/create', async (req, res) => {
  try {
    const {name, occupation, catchPhrase} = req.body;
    await Celebrity.create({name, occupation, catchPhrase});
    res.redirect('/celebrities')
  }
  catch (error) {
  
    console.log(error)
  }
});

// Iteration #4: Listing Our Celebrities

//GET route to display all the celebrities in the database

router.get('/celebrities', async (req, res) => {
  try {
    
    let allCelebritiesFromDB = await Celebrity.find();
    console.log(allCelebritiesFromDB)
    res.render('celebrities/celebrities.hbs', { celebrities: allCelebritiesFromDB });

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;