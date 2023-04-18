// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');


// all your routes here
router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity");
  });



router.post('/create', (req, res, next) => {
const { name, occupation, catchPhrase } = req.body;


const newCelebrity = new Celebrity({ name, occupation, catchPhrase });


newCelebrity.save()
    .then(() => {
    
    res.redirect('/celebrities');
    })
    .catch((error) => {
    
    res.render('celebrities/new-celebrity', { error });
    });
});


router.get("/", (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("celebrities/celebrities", { celebrities });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error retrieving celebrities from database");
      });
  });
  
 

module.exports = router;


