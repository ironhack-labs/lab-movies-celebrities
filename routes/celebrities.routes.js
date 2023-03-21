// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const express = require("express");



//create

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const celebrityDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.create(celebrityDetails)
    .then((celebrityFromDB) => {
      res.render("celebrities/new-celebrity");
    })
    .catch((e) => {
      console.log(`Something wrong with creating celebrity`, e);
    });
});
module.exports = router;

//display

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebsArr=>{
        const data={
            celebrities: celebsArr
        }
        res.render("celebrities/celebrities", data)
    })
  });

  