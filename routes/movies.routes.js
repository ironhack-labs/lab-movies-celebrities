const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch(error => {
      res.render("error", { errorMessage: "Error fetching data" });
    });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies"); 
    })
    .catch(error => {
      Celebrity.find()
        .then(celebrities => {
          res.render("movies/new-movie", { errorMessage: "Error creating movie", celebrities });
        })
        .catch(error => {
          res.render("error", { errorMessage: "Error fetching data" });
        });
    });
});

router.get("/", (req, res) => {
  Movie.find()
    .populate("cast")
    .then(movies => {
      res.render("movies/movies", { movies });
    })
    .catch(error => {
      res.render("error", { errorMessage: "Error fetching data" });
    });
});

router.get("/:id", (req, res) => {
    const movieId = req.params.id;
  
    Movie.findById(movieId)
      .populate("cast")
      .then(movie => {
        if (!movie) {
          res.render("error", { errorMessage: "Movie not found" });
        } else {
          res.render("movies/movie-details", { movie });
        }
      })
      .catch(error => {
        res.render("error", { errorMessage: "Error fetching data" });
      });
  });
  
  module.exports = router;