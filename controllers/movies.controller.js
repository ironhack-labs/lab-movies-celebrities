const mongoose = require('mongoose');
const MovieModel = require('../models/Movie.model');
const CelebrityModel = require('../models/Celebrity.model');
const createError = require('http-errors');

module.exports.createMovie = (req, res, next) => {

  CelebrityModel.find()
    .then((artist) => res.render('movies/new-movie', { artist }))
    .catch((error) => next(error));
}

module.exports.doCreateMovie = (req, res, next) => {
  const movie = req.body;

  MovieModel.create(movie)
    .then((film) => res.redirect('/movies'))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('movies/new-movie', {movie, errors: error.errors});
      } else {
        next(error);
      }
    })
}

module.exports.list = (req, res, next) => {

  MovieModel.find()
    .populate('cast') // Con esto Mongoose se encargará de reemplazar los _id en el campo cast con los documentos completos de celebrity
    .then((movies) => {
      res.render('movies/movies', { movies })
    })
    .catch((error) => next(error));
}

module.exports.details = (req, res, next) => {
  const { id } = req.params;

  MovieModel.findById(id)
    .populate('cast')
    .then((movie) => {
      if (!movie) {
        next(createError(404, 'Movie not found'));
      } else {
        res.render('movies/movie-details', { movie })
      }
    })
    .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  MovieModel.findByIdAndDelete(id)
    .then((movie) => {
      if (!movie) {
        next(createError(404, 'Movie not found'));
      } else {
        res.redirect('/movies')
      }
    })
    .catch((error) => next(error));
}

module.exports.editMovie = (req, res, next) => {
  const { id } = req.params;

  Promise.all([MovieModel.findById(id), CelebrityModel.find()])
    .then(([movie, celebrities]) => res.render('movies/edit-movie', {movie, celebrities, id}))
    .catch((error) => next(error));
}

module.exports.doEditMovie = (req, res, next) => {
  const editedMovie = req.body;
  const { id } = req.params;

  MovieModel.findByIdAndUpdate(id, editedMovie, { new: true })
    .then((filmEdited) => res.redirect(`/movies/${id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('movies/edit-movie', {editedMovie, errors: error.errors})
      } else {
        next(error);
      }
    })
}
