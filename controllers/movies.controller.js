const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
module.exports.createMovie = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render("movies/new-movie", { celebrities });
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports.doCreateMovie = (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
      console.log(movie);
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports.getMovies = (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports.movieDetails = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndDelete(movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports.editMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      Celebrity.find().then((celebrities) => {
        console.log(celebrities);
        res.render("movies/edit-movie", { movie, celebrities });
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports.updateMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndUpdate(movieId, req.body, {new: true})
    .then((updateMovie) => {
      console.log(updateMovie);
      res.redirect(`/movies/${updateMovie._id}`);
    })
    .catch(error => next(error));
};
