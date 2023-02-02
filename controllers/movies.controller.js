const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then(celebrities => res.render("movies/new-movie", { celebrities }))
    .catch(next)
}

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then(() => res.redirect("/movies"))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  Movie.find()
    .then(movies => res.render("movies/movies", { movies }))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then(movie => {
      res.render("movies/movie-details", { movie })
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  console.log("slay")
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch(err => console.log("ERROR GURL", err))
}

module.exports.edit = (req, res, next) => {
  const moviesPromise = Movie.findById(req.params.id)
  const celebritiesPromise = Celebrity.find()
  Promise.all([moviesPromise, celebritiesPromise])
    .then(response => {
      const [movie, celebrities] = response
      console.log(movie.plot)
      res.render("movies/edit-movie", { movie, celebrities })
    })
    .catch(next)
}

module.exports.doEdit = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect(`/movies/${req.params.id}`))
    .catch(next)
}