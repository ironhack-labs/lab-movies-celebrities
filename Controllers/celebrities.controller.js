const express = require('express');
const Celebrity = require('../models/Celebrity.model');


module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/celebrities', { celebrities });
    })
}

module.exports.createForm = (req, res, next) => {
    res.render('celebrities/new-celebrity');
  }


  module.exports.doCreate = (req, res, next) => {
    const celebrity = req.body;
  
    Celebrity.create(celebrity)
      .then((celebrity) => {
        res.redirect("/celebrities");
      })
      .catch((error) => {
        console.log('error: ', error);
        res.render("celebrities/new-celebrity", { errorMessage: error });
      });
  };

