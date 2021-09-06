// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
require('./index')
require("dotenv/config")
const Celebrity = require("../models/Celebrity.model");


router.get('/celebrities/crear', (req, res) => {
    res.render('./../views/celebrities/new-celebrity')
    
    
})

  router.post('/celebrities/crear', (req, res) => {
  
    const {name, occupation, catchPhrase} = req.body
  
    Celebrity
      .create(req.body)
      .then(celebrities => res.redirect('/celebrities/lista'))
      .catch(err => console.log(err))
      
  })

  router.get('/celebrities/lista', (req, res) => {

    Celebrity
      .find()
      .select(req.body)
      .then(Celebrity => res.render('./../views/celebrities/celebrities.hbs', {Celebrity}))
      .catch(err => console.log(err))
  })


module.exports = router;
