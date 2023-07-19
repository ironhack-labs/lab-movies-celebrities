const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

module.exports.create = (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
};

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then((movieCreated) => res.redirect(`/movies/${movieCreated.id}`))
    .catch((err) => console.error(err));
};
