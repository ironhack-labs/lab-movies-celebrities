const mongoose = require("mongoose");
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => res.render("movies/new-movie", { celebrities }))
    .catch((error) => next(error));
};

module.exports.doCreate = (req, res, next) => {
  const movie = req.body;

  Movie.create(movie)
    .then((movie) => res.redirect("/movies"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        Celebrity.find()
          .then((celebrities) => {
            res.status(400).render("movies/new-movie", {
              celebrities,
              errors: error.errors,
            });
            res.render("movies/new-movie", { celebrities });
          })
          .catch((error) => next(error));
      } else {
        next(error);
      }
    });
};

module.exports.list = (req, res, next) => {
  Movie.find()
    .then((movies) => res.render("movies/movies", { movies }))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        next(createError(404, "Movie not found"));
      } else {
        Celebrity.find({
          _id: { $in: movie.cast },
        }).then((cast) => res.render("movies/movie-details", { cast, movie }));
      }
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
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
        Celebrity.find().then((celebrities) =>
          res.render("movies/edit-movie", { celebrities, movie })
        );
      }
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
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
        res.status(400).render("movies/edit-movie", {
          movie: req.body,
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};
