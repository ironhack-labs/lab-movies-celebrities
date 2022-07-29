const { model } = require('mongoose');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// Read
module.exports.list = (req, res, next) => {
    Movie.find()
        .populate('cast')
        .then((movies) => {
            res.render('movies/list', { movies });
        })
        .catch(next)
};

module.exports.details = (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/details', { movie });
            console.log(movie)
        })
        .catch((err) => {
            console.error(err);
        })
};

// Create
module.exports.create = (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('movies/new', { celebrities });
        })
}

module.exports.doCreate = (req, res, next) => {
    Movie.create(req.body)
        .then((createMovie) => {
            console.log(createMovie);
            res.redirect('/movies');
        })
        .catch((err) => {
            next(err);
        })
}

// Update
module.exports.edit = (req, res, next) => {
    const { id } = req.params;
    let movie = null
    Movie.findById(id)
        .then((movieFind) => {
            console.log(movieFind)
            movie = movieFind
            return Celebrity.find()
        })
        .then((celebrities) => {
            res.render('movies/update', { movie, celebrities })
        })
        .catch((err) => {
            console.error(err)
        })
}

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndUpdate(id, req.body, { new: true })
        .then((movie) => {
            console.log(movie);
            res.redirect(`/movies/${movie.id}`);
        })
}

// Delete
module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(next)
}