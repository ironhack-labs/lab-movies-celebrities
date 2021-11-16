const express = require('express');
const router = express.Router();

const Celebrity = require("../models/Celebrity.model");

// Create celebrity
router.route("/create")
  .get((req, res) => {
    res.render("celebrities/new-celebrity")
  })
  .post((req, res) => {
    const {name, occupation, catchPhrase} = req.body

    Celebrity
      .create( { name, occupation, catchPhrase } )
      .then( (createdCeleb) => { 
        res.redirect("/celebrities")
      })
      .catch( (error) => {
        res.render("celebrities/new-celebrity", { errorCreation: error } )
      })
  })



// Delete celebrity
router.get('/delete/:id', (req, res, next) => {
  Celebrity.findByIdAndDelete({_id: req.params.id})
    .then( () => { res.redirect("/celebrities") })
    .catch( (error) => res.render("error", { error: error } ))
  })
  
// List celebrities
router.get('/', (req, res, next) => {
  Celebrity.find()
  .then( (celebrities) => { 
      res.render("celebrities/celebrities", { celebrities: celebrities }) 
  })
  .catch( (error) => res.render("error", { error: error } ))
  })

// Celebrity Page    
router.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
      .then( (celeb) => { 
          res.render("celebrities/singleCelebrity", celeb ) 
      })
      .catch( (error) => res.render("error", { error: error } ))
      })

module.exports = router;
