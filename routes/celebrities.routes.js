const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
  });

  router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
     .then(celebrity => {
        res.redirect('/celebrities')
     })
     .catch(err => res.redirect('/celebrities/redirect'))
 })
 
 router.get('/celebrities', (req, res) => {
     Celebrity.find()
     .then(celebrity => res.render('celebrities/celebrities', {celebrity}))
     .catch(err => console.log(err))
 })
 
 module.exports = router;
 