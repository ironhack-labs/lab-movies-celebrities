const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

module.exports.list = (req, res, next) => {
    res.render('movies/movies');
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
}