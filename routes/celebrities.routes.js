// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
/* const Movie = require("../models/Movie.model") */

// all your routes here

// Create Celebs GET
router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'));

// Create Celebs POST
router.post('/celebrities/create', async (req, res, next) => {
    try {
      
      const { name, occupation, catchPhrase} = req.body

      await Celebrity.create({ name, occupation, catchPhrase})
  
      res.redirect('/celebrities');

    } catch (error) {
      console.log(error);
      res.redirect('/celebrities/new-celebrity');
    }
  });


//Show All Celebrities


router.get('/celebrities', async (req, res, next) => {
  try {
     
    let celebrities = await Celebrity.find();
    //render the view with the information
    res.render('celebrities/celebrities', { celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;