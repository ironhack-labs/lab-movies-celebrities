const createError = require("http-errors");
const Movie = require("../models/movie.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => res.render("movies/new-movie");

module.exports.doCreate = (req, res, next) => {
    const movie = req.body;

    Movie.create(movie)
        .then((movie) => res.redirect("/movies"))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              res
                .status(400)
                .render("movies/new-movie", { movie, errors: error.errors });
            } else {
              next(error);
            }
    });
};

module.exports.list = (req, res, next) => {
    Movie.find()
        .then((movies) => res.render("movies/list", { movies }))
        .catch((error) => next(error));
};

module.exports.details = (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
        .then((movie) => {
            if (!movie) {
            next(createError(404, "Movie not found"));
            } else {
            res.render("movies/movie-details", { movie });
            }
        })
        .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then((movie) => {
        if (!movie) {
            next(createError(404, "Movie not found"));
        } else {
            res.redirect("/movies");
        }
        })
        .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
    Movie.findById(req.params.id)
        .then((movie) => {
            if (!movie) {
            next(createError(404, "Movie not found"));
            } else {
            res.render(`movies/edit-movie`, { movie });
            }
        })
        .catch(next);
};

module.exports.doEdit = (req, res, next) => {
    const movie = req.body;
    movie.id = req.params.id;
  
    Movie.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        .then((movie) => {
            if (!movie) {
            next(createError(404, "Movie not found"));
            } else {
            res.redirect(`/movies/${movie.id}`);
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
            res
                .status(400)

                .render("movies/edit-movie", { movie: req.body, errors: error.errors });
            } else {
            next(error);
            }
        });
};