const router = require("express").Router();

const Movie = require("../models/Movie.model");

module.exports.home = (req, res, next) => {
    Movie.find()
    .then((movies)=>{
        res.render("movies/movies.hbs", {movies});
    })
  
};

module.exports.createMovie = (req, res, next) => {
  res.render("movies/new-movie.hbs");
};

module.exports.doCreateMovie = (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((e) => res.render("movies/new-movie.hbs"));
};