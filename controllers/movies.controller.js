const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

module.exports.list = (req, res, next) => {
    Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
}

module.exports.create = (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render("movies/create-movie", {celebrities});
    })
    .catch((err) => {
        res.render("movies/create-movie")
    });
  };

module.exports.doCreate = (req, res, next) => {
    Movie.create(req.body)
    .then((movie) => {
        res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => {
        res.render("movies/create-movie")
    });
};

module.exports.detail = (req, res, next) => {
    const { id } = req.params
    Movie.findById(id)
    .populate("cast")
    .then((movie) => {
        res.render("movies/movie-details", { movie })
    })
    .catch((err) => next(err));
};

module.exports.edit = (req, res, next) => {
  const { id } = req.params;

  Promise.all([Movie.findById(id), Celebrity.find()])
    .then(([movie, celebrities]) => {
      res.render("movies/edit-movie", { movie, celebrities });
    })
    .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;
  Movie.findByIdAndUpdate(id, req.body, { new: true })
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => next(err));
}

module.exports.delete = (req, res, next) => {
        const { id } = req.params;
        Movie.findByIdAndDelete(id)
          .then(() => res.redirect('/movies'))
          .catch(error => next(error));
}

