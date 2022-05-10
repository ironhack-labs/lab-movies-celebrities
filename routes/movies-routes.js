// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const { populate } = require("../models/Movie.model");
//User model:
const Movie = require("../models/Movie.model");
// Creating the route:
router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      console.log(movie);
      res.render("movies/movies", { movie });
    })
    .catch((err) => next(err));
});

// Add the form to be able to receive info:
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => console.log(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => res.redirect("movies/create"));
});

router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then((movies) => res.render("movies/movies", { movies }))
    .catch((err) => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params.id;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("/movies/details", movie);
    })
    .catch((err) => next(err));
});

router.post("movies/:id/delete", (req, res, next) => {
  const { id } = req.params.id;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/edit-movie", { movie });
    })
    .catch((err) => next(err));
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect("/movies/:id"))
    .catch((err) => console.log(err));
});

module.exports = router;
