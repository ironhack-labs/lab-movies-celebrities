const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

module.exports.createMovie = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => next(err));
};

module.exports.exportMovie = (req, res, next) => {
  Movie.create(req.body)
    .then((movieCreated) => {
      console.log(movieCreated);
      res.redirect("/movies");
    })
    .catch((err) => next(err));
};
module.exports.showMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
};

module.exports.showMovieDetails = (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req,res,next) => {
  Movie.findByIdAndDelete(req.params.id)
  .then((movie)=>{
    res.redirect("/movies");
  })
  .catch((err) => next(err));
}

module.exports.editMovie = (req,res,next) => {
  Promise.all([Movie.findById(req.params.id), Celebrity.find()])
  .then(([movie, celebrities]) => {
    res.render("movies/edit-movie", { movie, celebrities });
  })
  .catch((err) => next(err));
}

module.exports.doEditMovie = (req,res,next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect("/movies");
  })
  .catch((err) => next(err));
};
