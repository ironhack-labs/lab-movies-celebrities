// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require the Celebrity model

const Celebrity = require ('../models/Celebrity.model')



// all your routes here


//Iteration 3: add new celebrities / Create

// GET route to display the form

router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity.hbs'));

// POST route to save a new celebrity to the database in the celebrities collection

router.post('/celebrities/create', (req, res, next) => {
    // console.log(req.body);
    const { name, occupation, catchPhrase } = req.body;
   
    Celebrity.create({ name, occupation, catchPhrase })
      // .then(celebrityFromDB => console.log(`New celebrity created: ${celebrityFromDB.name}.`))
      .then(() => res.redirect('/celebrities'))
      .catch(error => next(error));
  });

//Iteration #4: Listing Celebrities / Read

// GET route to retrieve and display all the celebrities

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((allCelebritiesFromDB) => {
        // console.log(allCelebritiesFromDB)
        res.render('celebrities/celebrities.hbs'), {celebrities : allCelebritiesFromDB}})
    .catch(err=>next(err))
})




module.exports = router;