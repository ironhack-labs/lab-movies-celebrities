const mongoose = require('mongoose');
const Movie = require('../models/movie.model');
const Celebrity = require('../models/celebrity.model');

module.exports.create = (req, res, next) => {
    
    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities });
        })
        .catch((error) => next(error));
};

module.exports.doCreate = (req, res, next) => {
    const movie = req.body;

    Movie.create(movie)
        .then((movie) => {
            res.redirect('/movies');
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                Celebrity.find()
                    .then((celebrities) => res.render('movies/new-movie', { movie, celebrities, errors: error.errors }))
                    .catch((error) => next(error));
            } else {
                next(error);
            }
        });
};

module.exports.list = (req, res, next) => {
    
    Movie.find()
        .then((movies) => res.render('movies/movies', { movies }))
        .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
    const { id } = req.params

    Movie.findById(id)
        .populate('cast')
        .then((movie) => res.render('movies/movie-details', { movie }))
        .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
    const { id } = req.params;

    Movie.findById(id)
        .then((movie) => {

            Celebrity.find()
                .then((celebrities) => res.render('movies/edit-movie', { movie, celebrities }))
                .catch((error) => next(error));
        })
        .catch((error) => next(error));
};

module.exports.doEdit = (req, res, next) => {
    const movie = req.body;
    const { id } = req.params; 

    Movie.findByIdAndUpdate(id, movie, { runValidators: true })
        .then(() => res.redirect(`/movies/${id}`))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                Celebrity.find()
                    .then((celebrities) => res.render('movies/edit-movie', { movie, celebrities, errors: error.errors }))
                    .catch((error) => next(error));
            } else {
                next(error);
            }
        });
};