const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

module.exports.list = (req, res, next) => {
    Movie.find()
    .then(movies => res.render('movies/movies', { movies }))
    .catch(err => console.error(err))
};

module.exports.create = (req, res, next) => {
    Celebrity.find()
    .then(celebrities => res.render('movies/new-movie', { celebrities }))
    .catch(err => console.error(err))
};

module.exports.doCreate = (req, res, next) => {
    Movie.create(req.body)
    .then((newMovie) => {
        res.redirect('/movies')
        console.info(`${newMovie.title} has been created`)
    })
    .catch((err) => {
        res.render('movies/new-movie');
        console.error(err)
    })
};

module.exports.detail = (req, res, next) => {
    Movie.findById(req.params.id)
    .populate('cast')
    .then((movie) => {
        res.render('movies/movie-details', { movie })
    })
    .catch(err => console.error(err))
}