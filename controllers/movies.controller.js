const Movie = require('../models/Movie.model')
const Celeb = require('../models/Celebrity.model')


module.exports.create = (req, res, next) => {
    Movie.find()
        .then((celeb) => {
            res.render('movies/new-movie', { celeb })
        })
        .catch((error) => next(error))
}

module.exports.doCreate = (req, res, next) => {
    const movie = req.body
    Movie.create(movie)
        .then((movies) => res.redirect(`/movies`))
        .catch((error) => next(error))
}

module.exports.list = (req, res, next) => {
    Movie.find()
        .then((movies) => res.render('movies/movies', { movies }))
        .catch((error) => next(error))
}