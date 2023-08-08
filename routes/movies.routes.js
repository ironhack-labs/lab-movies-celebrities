// routes/movies.routes.js
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// GET route to show the form for creating a new movie
router.get("/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch (error) {
    console.error("Error retrieving celebrities:", error);
    res.render("error", { errorMessage: "Error retrieving celebrities." });
  }
});
// GET route to show the form for updating a movie
router.post("/create", async (req, res) => {
    const { title, genre, plot, cast } = req.body;
  
    try {
      const newMovie = await Movie.create({
        title,
        genre,
        plot,
        cast,
      });
      //
      console.log("New movie created:", newMovie);
      res.redirect("/movies"); // Redirect to the page with the list of all movies
    } catch (error) {
      res.render("movies/new-movie", {
        errorMessage: "Error creating the movie.",
        celebrities: await Celebrity.find(),
      });
    }
  });
  // GET route to show the list of all movies
  router.get("/", async (req, res) => {
    try {
      const movies = await Movie.find();
      res.render("movies/movies", { movies });
    } catch (error) {
      console.error("Error retrieving movies:", error);
      res.render("error", { errorMessage: "Error retrieving movies." });
    }
  });
  // GET route to show the form for updating a movie
  router.get("/:id", async (req, res) => {
    const movieId = req.params.id;
  
    try {
      const movie = await Movie.findById(movieId).populate("cast");
      if (!movie) {
        return res.render("error", { errorMessage: "Movie not found." });
      }
      res.render("movies/movie-details", { movie });
    } catch (error) {
      console.error("Error retrieving movie details:", error);
      res.render("error", { errorMessage: "Error retrieving movie details." });
    }
  });

  // POST route to delete a specific movie
router.post("/:id/delete", async (req, res) => {
    const movieId = req.params.id;
  
    try {
      // Use findByIdAndRemove to delete the specific movie by its id
      await Movie.findByIdAndRemove(movieId);
      res.redirect("/movies"); // Redirect to the list of all movies after deletion
    } catch (error) {
      console.error("Error deleting the movie:", error);
      res.render("error", { errorMessage: "Error deleting the movie." });
    }
  });
//
  router.get("/:id/edit", async (req, res) => {
    const movieId = req.params.id;
  
    try {
      // Find the specific movie by its id
      const movie = await Movie.findById(movieId);
  
      // Retrieve all celebrities for the cast
      const celebrities = await Celebrity.find();
  
      if (!movie) {
        return res.render("error", { errorMessage: "Movie not found." });
      }
  
      res.render("movies/edit-movie", { movie, celebrities });
    } catch (error) {
      console.error("Error retrieving movie details for editing:", error);
      res.render("error", { errorMessage: "Error retrieving movie details for editing." });
    }
  });

  // POST route to update a specific movie
router.post("/:id", async (req, res) => {
    const movieId = req.params.id;
  
    try {
      // Find the movie by its id and update its attributes based on the form submission
      await Movie.findByIdAndUpdate(movieId, req.body);
      res.redirect(`/movies/${movieId}`); // Redirect back to the movie details page
    } catch (error) {
      console.error("Error updating the movie:", error);
      res.render("error", { errorMessage: "Error updating the movie." });
    }
  });

module.exports = router;
