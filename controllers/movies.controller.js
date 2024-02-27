const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const createError = require('http-errors')

module.exports.createMovie = (req, res, next) => {
    Celebrity
      .find()
      .then((celebrity) => res.render('movies/new-movie', { celebrity }))
      .catch((error) => next(error))
}

module.exports.doCreateMovie = (req, res, next) => {
    const movie = req.body;

    Movie.create(movie)
      .then(() => res.redirect('/movies'))
      .catch((error) => next(error))
}

module.exports.list = (req, res, next) => {
    Movie
      .find()
      .populate('cast')
      .then((movies) => res.render('movies/movies', { movies }))
      .catch((error) => next(error))
}

module.exports.details = (req, res, next) => {
    const { id } = req.params;

    Movie
      .findById(id)
      .populate('cast')
      .then((movie) => {
        if (!movie) {
            next(createError(404, 'Movie not found'))
        } else {
            res.render('movies/movie-details', { movie })
        }
      })
      .catch((error) => next((error)))
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    Movie
      .findByIdAndDelete(id)
      .then((movie) => {
        if (!movie) {
            next(createError(404, 'Movie not found'))
        } else {
            res.redirect('/movies')
        }
      })
      .catch((error) => next(error))
}

module.exports.edit = (req, res, next) => {
    const { id } = req.params;

    Promise
      .all([MovieModel.findById(id), CelebrityModel.find()])
      .then(([movie, celebrities]) => res.render('movies/edit-movie', {movie, celebrities, id}))
      .catch((error) => next(error));
}

module.exports.doEdit = (req, res, next) => {
    const movie = req.body;
    const { id } = req.params;

    Movie
      .findByIdAndUpdate(id, movie, { runValidators: true})
      .then((movie) => {
        if (!movie) {
            next(createError(404, 'Movie not found'))
        } else {
            res.redirect('/movies/${movie.id}')
        }
      })
      .catch((error) => next(error))
}