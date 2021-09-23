const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

exports.getCreatedMovies = (req, res) => {
  Celebrity.find()
    .then((celeb) => {
      res.render("movies/new-movie", { celebrities: celeb });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.createMovie = (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title,
    genre,
    plot,
    cast,
  })
    .then((newMovie) => {
      console.log(newMovie);
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.getMovies = (req, res) => {
  Movie.find()
    .then((movies) => {
      const list = movies;
      console.log(list);
      res.render("movies/movies", { movies: list });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.movieDetails = (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((details) => {
      console.log(details);
      res.render("movies/movie-details", details);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.deleteMovie = (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.editMovie = async (req, res) => {
  const { id } = req.params;
  const editMovie = await Movie.findById(id).populate("cast");
  Celebrity.find({})
    .then((cast) => {
      res.render("movies/edit-movie", { cast: cast, Movie: editMovie });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.editMovieForm = (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log(e);
    });
};
