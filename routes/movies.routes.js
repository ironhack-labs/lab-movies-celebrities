const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// Route to show the form to create a movie
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
});

// Route to handle the form submission and create a new movie
router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  // Create a new instance of the Movie model
  const newMovie = new Movie({
    title,
    genre,
    plot,
    cast,
  });

  // Save the new movie to the database
  newMovie
    .save()
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
});

// Route to show all movies
router.get("/", (req, res) => {
    Movie.find()
      .then((movies) => {
        res.render("movies/movies", { movies });
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/");
      });
  });
  
  // Route to show a specific movie
router.get("/:id", (req, res) => {
    const movieId = req.params.id;
  
    Movie.findById(movieId)
      .populate("cast")
      .then((movie) => {
        res.render("movies/movie-details", { movie });
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/movies");
      });
  });

  // Route to delete a specific movie
router.post("/:id/delete", (req, res) => {
    const movieId = req.params.id;
  
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch((error) => {
        console.log(error);
        res.redirect(`/movies/${movieId}`);
      });
  });

  // Route to show form to edit a movie
router.get("/:id/edit", (req, res) => {
    const movieId = req.params.id;
  
    Promise.all([Movie.findById(movieId), Celebrity.find()])
      .then(([movie, celebrities]) => {
        res.render("movies/edit-movie", { movie, celebrities });
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/movies");
      });
  });
  
  // Route to update a specific movie
  router.post("/:id/edit", (req, res) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
  
    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
      .then(() => {
        res.redirect(`/movies/${movieId}`);
      })
      .catch((error) => {
        console.log(error);
        res.redirect(`/movies/${movieId}/edit`);
      });
  });
  
  

module.exports = router;
