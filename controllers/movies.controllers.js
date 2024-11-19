const Movie = require('../models/Movie.model');
const Celebrity = require("../models/Celebrity.model")

module.exports.createMovie = (req, res, next) => {
    Celebrity.find()
     .then((celebs) => {
         res.render('movies/new-movie', { celebs })
     })
}

module.exports.doCreateMovie = (req, res, next) => {
    console.log(req.body)
    Movie.create(req.body)
    .then((createdMovie)=>{
        console.log(createdMovie);
        res.redirect('/movies/movies')
    })
}

module.exports.listMovie = (req, res, next) => {
    Movie.find()
    .populate("cast")
    .then(movies =>res.render("movies/movies", { movies }))
    .catch(err => next(err))
}

module.exports.detailMovie = (req, res, next) => {
    const { movieId } = req.params;
    Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
        console.log(movie)
        res.render("movies/movie-details", { movie })
    })
    .catch(err => next(err))
}

module.exports.deleteMovie = (req, res, next) => {
    const { movieId } = req.params;
    Movie.findByIdAndDelete(movieId)
    .then(()=>{
        res.redirect("/movies/movies")
    })
    .catch(err => next(err))
}

module.exports.editMovie = (req, res, next) => {
    const { movieId } = req.params;
    Movie.findById(movieId)
    .then((movie)=>{
        res.render("movies/edit-movie", { movie })
    })
    .catch(err => next(err))
}


module.exports.doEditMovie = (req, res, next) => {
    const { movieId } = req.params;
  
    Movie.findByIdAndUpdate(movieId, req.body, { new: true })
      .then((updatedMovie) => {
        res.redirect(`/movies/${updatedMovie._id}`);
      })
      .catch(err => next(err));
  };
