const mongoose = require('mongoose');
const CelebrityModel = require('../models/Celebrity.model');
const createError = require('http-errors')

module.exports.index = (req, res, next) => {
  res.render("index");
};

module.exports.createCelebrities = (req, res, next) => res.render('celebrities/new-celebrity');

module.exports.doCreateCelebrities = (req, res, next) => {
  console.log(req.body);
  const celebrity = req.body;

  CelebrityModel.create(celebrity)
    .then((artist) => res.redirect('/celebrities'))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('celebrities/new-celebrity', {celebrity, errors: error.errors})
      } else {
        next(error);
      }
    })
}

module.exports.list = (req, res, next) => {
  CelebrityModel.find()
    .then((artist) => res.render('celebrities/celebrities', { artist }))
    .catch((error) => next(error));
}


