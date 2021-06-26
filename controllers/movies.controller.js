const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


// Crear detalles película GET
module.exports.createMovie = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie.hbs', { celebrities })
        })
};

// Crear movie POST
module.exports.doCreateMovie = (req, res, next) => {
    Movie.create(req.body)
        .then((movie) => {
            res.redirect('/movies')
        })
        .catch((e) => res.render('movies/new-movie.hbs'))
};

// Buscar movies
module.exports.findMovie = (req, res, next) => {
    Movie.find()
        .then((movies) => {
            res.render('movies/movies.hbs', {
                movies
            })
        })
        .catch((e) => console.log((e)))
};

// Detalles de las movies
module.exports.findId = (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details', { movie })
        })
        .catch((e) => console.log((e)))
};

// Borrar movies POST
module.exports.deleteMovie = (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
    .then((movie) => res.redirect('/movies'))
    .catch((e) => console.error(e));
};

module.exports.editMovie = (req, res, next) => {
    Movie.findById(req.params.id)
      .then((movie) =>
        res.render('movies/edit-movie.hbs', { movie })
      )
      .catch((e) => console.error(e));
  };
  
  module.exports.doEditMovie = (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body)
      .then((movie) => res.redirect('/movies'))
      .catch((e) => console.error(e));
  };