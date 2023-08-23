const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

module.exports.list = (req, res, next) => {
  Movie.find({})
    .sort({ createdAt: -1 })
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch(() => {});
};

module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      const haveCelebrities = celebrities.length > 0;
      res.render("movies/new", {
        celebrities: celebrities,
        haveCelebrities: haveCelebrities,
      });
    })
    .catch(() => {});
};

module.exports.doCreate = (req, res, next) => {
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  })
    .then(() => {
      res.redirect(`/movies`);
    })
    .catch(() => {});
};

module.exports.detail = (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      const haveCelebrities = movie.cast && [movie.cast].length > 0;
      res.render("movies/detail", { movie, haveCelebrities });
    })
    .catch(() => {});
};

module.exports.edit = (req, res, next) => {
  let movieData;
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      movieData = movie;
      return Celebrity.find();
    })
    .then((celebrities) => {
      const haveCelebrities = celebrities.length > 0;
      res.render(`movies/edit`, {
        movie: movieData,
        celebrities: celebrities,
        haveCelebrities,
      });
    })
    .catch(() => {});
};

module.exports.doEdit = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  })
    .then((movie) => {
      res.redirect(`/movie/${movie.id}`);
    })
    .catch(() => {});
};

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(() => {});
};
