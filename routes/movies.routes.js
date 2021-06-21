const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

module.exports.home = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies.hbs", { movies });
    })
    .catch((e) => console.error(e));
};

module.exports.createMovie = (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie.hbs", { celebrities });
  });
};

module.exports.doCreateMovie = (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((e) => res.render("movies/new-movie.hbs"));
};

module.exports.idMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      res.render("movies/movie-details.hbs", { movie });
    })
    .catch((e) => console.error(e));
};

module.exports.editMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      Celebrity.find().then((celebrity) => {
        const data = {
          ...movie,
          celebrity,
        };
        res.render(`movies/edit-movie.hbs`, data);
      });
    })
    .catch((e) => console.error(e));
};

module.exports.doEditMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((movie) => res.redirect(`/movies`))
    .catch((e) => console.error(e));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((movie) => res.redirect(`/movies`))
    .catch((e) => console.error(e));
};
