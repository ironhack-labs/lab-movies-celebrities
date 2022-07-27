const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//LIST
module.exports.list = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
};

//CREATE
module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => next(err));
};

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
};

//SEE DETAILS
module.exports.details = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => next(err));
};

//DELETE
module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
};

//EDIT
module.exports.edit = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      Celebrity.find().then((celebrities) => {
        res.render("movies/edit-movie", { movie, celebrities });
      });
    })
    .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndUpdate(id, req.body, { new: true }) // new true sirve para que te devuelva el nuevo en el then sino te devuelve el viejo
    .then((movie) => {
      res.redirect(`/movies/${movie.id}`);
    })
    .catch((err) => next(err));
};
