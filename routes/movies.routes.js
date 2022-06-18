//iExpress and route import
const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");
const res = require("express/lib/response");

// all your routes here
router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
});
/////////////// CREATE MOVIE
//create GET
router.get("/movies/create", (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => {
      console.log("error", err);
      next();
    });
});
//create POST
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => res.redirect("movies/new-movie"));
  next();
});
/////////////// MOVIE DETAILS
//movie details GET
router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movieDetails) => {
      res.render("movies/movie-details", movieDetails);
    })
    .catch((err) => {
      console.log("error", err);
      next();
    });
});
/////////////// MOVIE DELETE
//delete post
router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error", err);
      next();
    });
});
/////////////// MOVIE EDIT
//edit GET
router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/edit-movie", { movie });
    })
    .catch((err) => {
      console.log("error", err);
      next();
    });
});
//edit POST
router.post("/movies/:id/edit", (req, next) => {
  const { id } = res.redirect("/movie/:id");
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect("/movies/:id"))
    .catch((err) => {
      res.redirect("/movies");
    });
});

module.exports = router;
