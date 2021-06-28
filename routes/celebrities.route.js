const express = require('express');
const router = express.Router();
const CelebrityModel = require('../models/Celebrity.model')
const MovieModel = require("../models/Movie.model")



router.get('/celebrities/create', (req, res, next) => {
        res.render('celebrities/new-celebrity.hbs')
});

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    console.log(req.body)
    CelebrityModel.create({name, occupation, catchPhrase})
        .then(() => {
          // send the user to the celebrities url
          res.redirect('/celebrities')
        })
        .catch(() => {
          // if error
          res.render("celebrities/new-celebrity.hbs")
        })
  });

  router.get('/celebrities', (req, res, next) => {
      CelebrityModel.find()
      .then((celebrities) => {
          res.render('celebrities/celebrities.hbs', {celebrities})
    })
      .catch(() => {
            next('Celebrities fetch failed')
  })
  });


  module.exports = router;