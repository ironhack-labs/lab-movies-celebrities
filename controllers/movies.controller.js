const Movie = require('../models/Movie.model')
const Celeb = require('../models/Celebrity.model')


module.exports.create = (req, res, next) => {
    Movie.find()
        .then((movies) => {
            res.render('movies/new-movie', { movies })
        })
        .catch((error) => next(error))
}

module.exports.doCreate = (req, res, next) => {
    const movie = req.body
    Movie.create(movie)
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/new-movie'))
}

module.exports.list = (req, res, next) => {
    Movie.find()
        .then((movies) => res.render('movies/movies', { movies }))
        .catch((error) => next(error))
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params
    Movie.findById(id)
        .then((movies) => res.render('movies/movie-details', { movies }))
        .catch((error) => next(error))
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params
    Movie.findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch((error) => next(error))
}

module.exports.edit = (req, res, next) => {
    const { id } = req.params
    Movie.findById(id)
        .then((movies) => {
            Celeb.find()
            .then((celebs) => res.render('movies/edit-movie', { movies, celebs }))
        })
        .catch((error) => next(error))
}

module.exports.doEdit = (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        .then((movies) => res.redirect(`/movies/${movies.id}`))
        .catch((error) => next(error))
}