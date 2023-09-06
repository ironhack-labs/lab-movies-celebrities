const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// const Movie = require("../models/Movie.model");

// all your routes here

router.get("/movies/create", (req, res) => {
  const celebrities = Celebrity.find();
  res.render("movies/new-movie", { celebrities });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      res.render("movies/new-movie");
      next(error);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      console.log("Retrieved celebrities from DB:", allMovies);
      res.render("movies/movies.hbs", { allMovies });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);
      next(error);
    });
});

module.exports = router;
