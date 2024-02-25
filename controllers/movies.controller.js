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
