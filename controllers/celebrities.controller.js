const mongoose = require('mongoose');
const CelebrityModel = require('../models/Celebrity.model');
const MovieModel = require('../models/Movie.model');
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

module.exports.details = (req, res, next) => {
  const { id } = req.params;
  
  Promise.all([CelebrityModel.findById(id), MovieModel.find({ cast: id })])
    .then(([celebrity , movie]) => {
      if (!celebrity) {
        next(createError(404, 'Celebrity not found'));
      } else {
        res.render('celebrities/celebrity-details', { celebrity, movie });
      }
    })
    .catch((error) => next(error));
}


module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  CelebrityModel.findByIdAndDelete(id)
    .then((celebrity) => {
      if (!celebrity) {
        next(createError(400, 'Celebrity not found'));
      } else {
        res.redirect('/celebrities');
      }
    })
    .catch((error) => next(error));
}

module.exports.edit = (req, res, next) => {
  const { id } = req.params;

  CelebrityModel.findById(id)
    .then((celebrity) => res.render('celebrities/edit-celebrity', { celebrity }))
    .catch((error) => next(error));
}

module.exports.doEdit = (req, res, next) => {
  const celebrityBody = req.body;
  const { id } = req.params;

  CelebrityModel.findByIdAndUpdate(id, celebrityBody)
    .then((celebrity) => res.redirect(`/celebrity/${id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('celebrities/edit-celebrity', {celebrityBody, errors: error.errors});
      } else {
        next(error);
      }
    })
}