const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//show the movies
module.exports.Movie = (req, res, next) => {
    Movie.find().then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch(err => console.log(err))  
  }

//create a new Movie
module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => next(err));
};

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
};


//detail of movie
module.exports.details = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
  .populate("cast")
  .then((movie) => {
    res.render("movies/movie-details", { movie });
  })
  .catch((err) => next(err));
};

//delete movie
module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(next);
}; 


  

