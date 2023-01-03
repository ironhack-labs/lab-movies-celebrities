const express = require('express');
const Celebrity = require("../models/Celebrity.model")
const router = express.Router();

// GET route
router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')
});
 
// POST route
router.post('/celebrities', (req, res, next) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
      .then(() => res.redirect('/celebrities'))
      .catch(error => {
        console.log('Error inserting Celebrity into DB', error)
        res.redirect('/celebrities/create')
      });
 
});

/* GET ALL celebrities */
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
  .then(celebritiesFromDB => {
      console.log(celebritiesFromDB);
      res.render("celebrities/celebrities", {celebrities: celebritiesFromDB});
  })
  .catch(error => {
      console.log("Error getting celebrities from DB", error);
      next();
  })
});

module.exports = router;