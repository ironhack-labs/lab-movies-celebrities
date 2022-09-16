const { application } = require("express");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity")  
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
  .then((celebFromDb) => {
    data = {
      celebrity: celebFromDb
    }
    res.render('celebrities/celebrities', data);
  })
  .catch(err => {
    console.log(err)
  })
});


router.post('/celebrities/create', (req, res, next) => {
    console.log({info: req.body})
    const celebToCreate = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(celebToCreate)
    .then(newlyCreatedCeleb => {

        console.log(newlyCreatedCeleb);
        res.redirect("/celebrities")
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;