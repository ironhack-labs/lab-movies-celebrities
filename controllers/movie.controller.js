const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


module.exports.list = (req, res, next) => {
    Movie.find()
        .then((movies) => res.render('movies/movies', { movies }))
        .catch((error) => next(error));
}

module.exports.details = (req, res, next) => {
    const { id } = req.params;

    Movie.findById(id)
        .populate("cast")
        .then((movie) => {
            res.render('movies/movie-details', { movie })
        })
        .catch((error) => next(error))
}

module.exports.create = (req, res, next) => {

    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch((error) => next(error))
}

module.exports.doCreate = (req, res, next) => {
    const movie = req.body;
    Movie.create(movie)
        .then((movie) => res.redirect(`/movies`))
        .catch((error) => next(error));
}

module.exports.edit = (req, res, next) => {
    const {id} = req.params;
    
    Celebrity.find()
        .then((celebrities) => {
            Movie.findById(id)
                .populate("cast")
                .then((movie) =>
                    res.render('movies/edit-movie', { movie, celebrities})
                )
                .catch(next)
        })
        .catch((error) => next(error))
}

module.exports.doEdit = (req, res, next) => {
    const movie = req.body;
    const {id} = req.params;

    Movie.findByIdAndUpdate(id, movie)
        .populate("cast")
        .then((movie) =>
            res.redirect(`/movies/${id}`)
        )
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    const {id} = req.params;

    Movie.findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(next)
}