const Movie = require("../models/movie.model");

module.exports.create = (req, res, next) => {
    res.render("movie/new-movie");
  };

module.exports.doCreate =(req, res, next) => {
    // Note: never trust the HTTP client, always whitelist your expected properties
  Movie.create({
    tittle: req.body.tittle,
    genere : req.body.genere,
    plot: req.body.plot,
  })
    .then(() => {
      res.redirect("/movies/create");
    })
    .catch(next);
}



  