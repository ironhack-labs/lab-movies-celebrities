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
};

module.exports.doDelete = (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
        res.redirect('/movies')
        console.info(`${movie.title} has been deleted`)
    })
    .catch(err => console.error(err))
};

module.exports.edit = (req, res, next) => {
    Promise.all([
        Movie.findById(req.params.id),
        Celebrity.find()
    ])
    .then((response) => {
        const [movie, celebrities] = response; // lo mismo que hacer lo de abajo
      // const movie = response[0]
      // const celebrities = response[1]
        res.render('movies/edit-movie', { celebrities, movie})
    })
    .catch(err => console.error(err))
};

module.exports.doEdit = (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((movie) => {
        res.redirect('/movies')
        console.info(`${movie.title} has been updated`)
    })
    .catch(err => console.error(err))
}