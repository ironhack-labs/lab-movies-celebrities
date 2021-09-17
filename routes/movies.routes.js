// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");

// all your routes here

router.get("/create", (req, res) => {
  res.render("movies/new-movie");
});

router.post("/create", (req, res) => {
  const { title, genre, plot } = req.body;

  Movie.create({ title, genre, plot })
    .then((theNewMovie) => {
      res.redirect("/");
    })
    .catch((error) => res.render("movies/new-movies"));
});

router.get("/", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log("no celebs", error);
    });
});

module.exports = router;
