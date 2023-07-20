const express = require('express');
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const Contract = require('../models/Contract.model');

module.exports.list = (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}

module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}

module.exports.doCreate = (req, res, next) => {
  const movie = req.body;
  
  Movie.create(movie)
    .then((movie) => {
      const contractPromises = movie.cast.map((celebrityId) => {
        return Contract.create({
          movie: movie._id,
          celebrity: celebrityId,
          amount: 10000
        })
      })
      return Promise.all(contractPromises)
    })
    .then((contracts) => {
      console.log('contracts: ', contracts);
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log('error: ', error);
      res.render("movies/new-movie", { errorMessage: error });
    });
}

module.exports.detail = (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .populate('cast')
    .populate('contracts')
    .then((movie) => {
      console.log('movie: ', movie);
      res.render("movies/movie-details", { movie });
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      return Celebrity.find()
        .then((celebrities) => {
          res.render("movies/new-movie", { movie, celebrities });
        })
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log('error: ', error);
      res.render("movies/new-movie", { errorMessage: error, movie: req.body });
    });
}
