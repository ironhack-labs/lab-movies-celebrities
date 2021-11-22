// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
  });

  router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    celebrityModel.create({name, occupation, catchPhrase})
    .then((celebrities) => {
      console.log(celebrities)
      res.redirect("/celebrities")
    })
    .catch((err) => {
      console.log(err)
      res.render("/celebrities/new-celebrity")
    })
  });
  router.get("/celebrities", (req, res, next) => {
    const celebrityInfo = Celebrity.find()
    .then((celebrityInfo) => {
      console.log(celebrityInfo)
      res.render('/celebrities', {celebrities: celebrityInfo})
    })
    .catch((err) => {
      console.log(err)
    })
  })
module.exports = router;