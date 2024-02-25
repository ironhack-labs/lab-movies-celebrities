const mongoose = require("mongoose");
const Movie = require("../models/movie.models");
const createError = require("http-errors");
const { param } = require("../config/routes.config");

module.exports.list = (req, res, next) => {
  Movie.find()
    .then((movies) => res.render("movies/list", { movies }))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => res.render("movies/create");

module.exports.doCreate = (req, res, next) => {
  const movie = req.body;
  Movie.create(movie)
    .then((movie) => res.redirect("/movies-list"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(error);
        res
          .status(400)
          .render("movies/create", { movie, errors: error.errors });
      } else {
        next(error);
      }
    });
};
module.exports.details = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        next(createError(404, "Movie not found"));
      } else {
        res.render("movies/details", { movie });
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
        res.render("movies/edit", { movie });
      }
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
    const movie = req.body;
    movie.id = req.params.id

  Movie.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((movie) =>{
        if(!movie){
            next(createError(404,"Movie not found"))
        } else {
            res.redirect(`/movies-details/${movie.id}`)
        }
    })
    .catch ((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).render("movies/edit", {movies : req.body, errors : error.errors})
        } else {
            next(error)
        }
    })
};
module.exports.delete = (req, res, next ) => {
    const {id} = req.params;
    console.debug(req.params)
    Movie.findByIdAndDelete(id)
        .then((movie) => {
            if (!movie) {
                next(createError(404,"movie not found"))
            } else {
                res.redirect('/movies-list')
            }
        })
        .catch ((error) => next  (error))
}