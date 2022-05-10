/* const { populate } = require("../models/Celebrity.model");
 */
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET LIST OF MOVIES */
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
});

/* CREATE MOVIES */

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrity) => {
      res.render("movies/new-movie", { celebrity });
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("movies/new-movie"));
});

/* DETAILS MOVIE */

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movies) => {
      res.render("movies/movie-details", { movies });
    })
    .catch((err) => next(err));
});

/* DELETE MOVIE */

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

/* EDIT MOVIE */

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id).then((movie) => {
    Celebrity.find()
      .then((celebrity) => {
        res.render("movies/edit-movie", { celebrity, movie });
      })
      .catch((err) => next(err));
  });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/${id}`);
    })
    .catch((err) => next(err));
});

/* EXPORTS */

module.exports = router;
