// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/new-movie", (req, res) => {
  Celebrity.find()
    .then((celebs) => {
      res.render("movies/new-movie", { celebs });
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => res.redirect("/movies"))
    .catch((err) => res.redirect("/movies/new-movie"));
});

router.get("/", (req, res) => {
  Movie.find()
    .then((movies) => {
      console.log(movies);
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
