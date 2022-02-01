const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find().then((foundCelebs) => {
    res.render("movies/new-movie", { celebs: foundCelebs });
  });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  console.log(title, genre, plot, cast);
  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      console.log("added movie " + newMovie.title);
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
      next(error);
      res.redirect("/movies/create");
    });
});

router.get("/movies", (req, res, next) => {
  res.render("movies/movies");
});

module.exports = router;
