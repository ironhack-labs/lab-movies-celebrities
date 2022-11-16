// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res) => {
  Movie.find().then((movies) => {
    res.render("./movies/movies", { movies: movies });
  });
});

router.get("/create", (req, res) => {
  Celebrity.find().then((data) => {
    res.render("movies/new-movie", { casts: data });
  });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.table({ title, genre, plot, cast });
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      res.render("./movies/new-movie");
    });
});

module.exports = router;
