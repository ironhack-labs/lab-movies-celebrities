
const router = require("express").Router();
const Celebrities = require('../models/Celebrity.model.js');



  
  //Get Route to show the create form
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
  });
  
  //post route to receive the info from the form and add it to the DB
  router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
  
    Celebrities.create({ name, occupation, catchPhrase })
      .then((celebrity) => {
       /*  console.log(`Created the celebrity ${createdBook.title}`); */
        res.redirect('/celebrities')
      })
      .catch((err) => {res.render('celebrities/new-celebrity')
      next(err);
  });
});


//route to get all celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrities.find()
      .then((Showallcelebrities) => res.render("celebrities/celebrities.hbs", { Showallcelebrities }))
      .catch((err) => {
        
        next(err);
      });
  }); 






module.exports = router;

