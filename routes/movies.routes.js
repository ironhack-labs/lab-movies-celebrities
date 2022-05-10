const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
});

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
  res.render("movies/update-form", movies);
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movies) => {
      res.render("movies/movie-details", movies);
    })
    .catch((err) => next(err));
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id).then((movies) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("movies/edit-movie", { movies, celebrities });
      })
      .catch((err) => next(err));
  });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

module.exports = router;
