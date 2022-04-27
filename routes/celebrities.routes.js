const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/celebrities/create", (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post("/celebrities", (req, res, next) => {
    Celebrity.create({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    })
      .then((results) => {
        res.redirect("celebrities")
      })
      .catch((err) => {
        res.render("/celebrities/create");
      });
  });

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(celebrityArray =>{
        res.render('celebrities/celebrities.hbs', {celebrities: celebrityArray})
    })
    .catch(err=>{
        next(err)
    })
})


module.exports = router