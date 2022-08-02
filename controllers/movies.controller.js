const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//listar películas
module.exports.list = (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
};

//crear películas
module.exports.create = (req, res, next) => {
  console.log("entra crear movies");
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => next(err));
};

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      console.log("🎬 movie creada");
      res.redirect("/movies");
    })
    .catch((err) => next(err));
};

//details
module.exports.details = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(movie)
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => next(err));
};

//edit
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

  Movie.findByIdAndUpdate(id, req.body, { new: true })
    .then((movie) => {
      res.redirect(`/movies/${movie.id}`, {id});
    })
    .catch((err) => next(err));
};

// DELETE

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(next);
};
