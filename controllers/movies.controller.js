const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

module.exports.list = (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/movies', { movies })
    })
    .catch(err => console.error(err))
}

module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('movies/form', { celebrities })
    })
}

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then((movieCreated) => res.redirect(`/movies/${movieCreated.id}`))
    .catch(err => console.error(err))
}

module.exports.detail = (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      if (movie) {
        res.render('movies/detail', { movie })
      } else {

      }
    })
    .catch(err => console.error(err))
}

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/movies')
    })
}

module.exports.edit = (req, res, next) => {
  Promise.all([
    Movie.findById(req.params.id),
    Celebrity.find()
  ])
    .then((response) => {
      const [movie, celebrities] = response;
      // const movie = response[0]
      // const celebrities = response[1]
      res.render("movies/form", { celebrities, movie, editing: true })
    })
}

module.exports.doEdit = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((movie) => {
      res.redirect(`/movies/${movie.id}`)
    })
}