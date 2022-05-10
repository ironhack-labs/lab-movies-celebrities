const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })

    .catch((err) => res.redirect("movies/create"));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => res.redirect("/movies/create"));
});

router.get("/movies", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
});

module.exports = router;
