const Movie = require('../models/Movie.model')

module.exports.create = (req, res, next) => {
    res.render('movies/new-movie')
}

module.exports.doCreate = (req, res, next) => {
    const data = {}

console.log(req.body);
    Movie.create(req.body)
        .then(createdMovie => {
            console.log(createdMovie)

            res.redirect('/movies')
        })
        .catch(err => next(err))// ¿Por que metemos el NEXT dentro?
}

module.exports.list = (req, res, next) => {
    Movie.find()
    .then(movies => {
        res.render('movies/movies', { movies, movie: { title: 'Juan'} })
    })
    .catch(next)
}