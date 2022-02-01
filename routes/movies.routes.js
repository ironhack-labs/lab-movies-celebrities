// Iteration #5
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// GET route for movies/create:
router.get("/movies/create", (req, res) => res.render("movies/new-movie"));

// POST route for movies/create:
router.post("/movies/create", (req, res) => {
    const { title, genre, plot } = req.body;
    Movie.findOne({ title })
      .then((movieFromDB) => {
        if (!movieFromDB) {
          Movie.create({ title, genre, plot })
          .then(() => res.redirect('/movies'));
        } else {
          res.render("/movies/create", { message: "It seems this movie is already created." });
          return;
        }
      })
      .catch((err) => console.log(`Error while creating a new movie: ${err}`));
  });

// GET all movies from the database:
router.get("/movies", (req, res) => {
    Movie.find()
      .then((moviesFromDB) => res.render("movies/movies", { movies: moviesFromDB }))
      .catch((err) => console.log(`Error while getting movies from the database: ${err}`));
  });

module.exports = router;