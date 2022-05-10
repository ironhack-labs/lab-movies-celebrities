const router = require("express").Router();

const CelebrityModel = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/movies", { movies });
    })

    .catch((err) => next(err));
});

// Create a new movie
router.get("/movies/create", (req, res, next) => {
  CelebrityModel.find()

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
});

module.exports = router;
