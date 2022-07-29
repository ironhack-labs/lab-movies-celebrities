const { model } = require('mongoose');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// Read
module.exports.list = (req, res, next) => {
    Movie.find()
        .populate('cast')//si aqui se quita el populate, solamente verás el ID
        .then((movies) => {
            res.render('movies/list', { movies });
        })
        .catch(next)
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

module.exports.delete = (req, res, next) => {
    const { id } = req.params

    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(next)
}