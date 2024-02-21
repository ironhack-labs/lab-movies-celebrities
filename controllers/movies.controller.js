const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

module.exports.list = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/list", { movies });
    })
    .catch((err) => next(err));
};

module.exports.detail = (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/detail", { movie });
    })
    .catch((err) => next(err));
};

module.exports.create = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/create", { movies });
    })
    .catch((err) => next(err));
};

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => next(err));
};

module.exports.edit = (req, res, next) => {
  const id = req.params.id;

  Promise.all([Movie.findById(id), Celebrity.find()])
    .then(([movie, celebrities]) => {
      res.render("movies/edit", { movie, celebrities });
    })
    .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body, { new: true })
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => next(err));
};

module.exports.delete = (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then((movie) => {
      console.log(`This movie was deleted from DB: ${movie.title}`);
      res.redirect("celebrities/list");
    })
    .catch((err) => next(err));
};
