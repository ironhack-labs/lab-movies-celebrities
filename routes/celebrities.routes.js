const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', async (req, res, next) => res.render('celebrities/new-celebrity'))

router.post('/celebrities/create', async (req, res, next) => {
  
    try {
      const { name, occupation, catchPhrase } = req.body;
      //create the book in the db
      await Celebrity.create({ name, occupation, catchPhrase });
  
      res.redirect('/celebrities');
    } catch (error) {
      console.log(error);
      next(error);
      res.redirect('celebrities/new-celebrity')
    }
  });
  router.get('/celebrities', async (req, res, next) => {
   
    try {
      let celebrity = await Celebrity.find({});
      
      res.render('celebrities/celebrities', { celebrity });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


module.exports = router;