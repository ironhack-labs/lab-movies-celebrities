const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

module.exports.newMovie = (req, res, next) => {
  Celebrity.find()
  .then(celebrities => {
    res.render("movies/new-movie", {celebrities});
  })
  }
  

module.exports.create = (req, res, next) => {
  Movie.create(req.body)
  .then(()=> {
    res.redirect("/movies");
  })
  .catch(err => res.send(err))
};

module.exports.find = (req, res) => {
  Movie.find()
  .then((movies)=> {
    res.render("movies/movies.hbs", {movies});
  })
  .catch(err => res.send(err))
}

module.exports.detail = (req, res) => {
  const id = req.params.movieId
  Movie.findById(id)
  .populate('cast')
  .then((movie) =>{
    res.render('movies/movie-details.hbs', { movie })
  })
  .catch(err => res.send(err))
}

module.exports.delete = (req, res) => {
  Movie.findByIdAndDelete(req.params.movieId)
  .then(() =>{
    res.redirect("/movies")
  })
  .catch(err => res.send(err))
}

module.exports.edit = (req, res) => {
  Movie.findById(req.params.movieId)
  .then((movie) =>{
    res.render("movies/edit-movie.hbs", {movie})
  })
  .catch(err => res.send(err))
}

module.exports.doEdit = (req, res) => {
  Movie.findByIdAndUpdate(req.params.movieId, req.body)
  .then(movie => {
    res.redirect(`/movies/${movie.movieId}/detail`)
  })
  .catch(err => res.send(err))
}