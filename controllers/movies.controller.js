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
    .populate("cast") // añado el populate para que me traiga los datos de las celebrities pasa de ids a objetos
    .then((movie) => {
      console.log(movie);
      res.render("movies/detail", { movie });
    })
    .catch((err) => next(err));
};

module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/create", { celebrities }); // le paso todas las celebrites por que voy a tener un select en la vista
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

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
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
      res.send(movie);
    })
    .catch((err) => next(err));
};

/*
{
  list : middleware,
  create :  middleware,
  update : middleware,
  delete : middleware,
}
*/
