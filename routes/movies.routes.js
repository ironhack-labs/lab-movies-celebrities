const express = require("express"); //defined express seperately
const router = express.Router();

const movieModel = require("../models/movie.model");

// GET route to display the form for creating a new movie
router.get("/new-movie", async (req, res) => {
  try {
    res.render("movies/new-movie");
  } catch (err) {
    console.log("Error rendering new movie form", err);
  }
});

// POST route to create a new movie and save it to the database
router.post("/new-movie", async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const createdMovie = await movieModel.create(req.body);
    console.log("Movie created:", createdMovie);
    res.redirect("/movies");
  } catch (err) {
    console.error("Error creating movie:", err);
    res.render("movies/new-movie", { errorMessage: "Error creating movie: " + err.message });
  }
});

// Route to display the list of movies
router.get("/", async (req, res, next) => {
  try {
    const movies = await movieModel.find();
    res.render("movies/movies", { movies: movies });
  } catch (err) {
    console.log("Error getting movies", err);
  }
});

router.get("/movies/:movieID", async (req, res) => {
  const { movieID } = req.params;
  try {
    const detailMovie = await movieModel.findById(movieID).populate("cast");
    res.render("movies/movie-details", { movie: detailMovie });
  } catch (err) {
    console.log("Error getting movie details", err);
  }
});

module.exports = router;
