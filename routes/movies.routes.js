const express = require("express");
const router = express.Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/new", async (req, res) => {
  const celebrities = await Celebrity.find();
  res.render("movies/new-movie", { celebrities });
});

router.post("/movies/new", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    const movie = new Movie({ title, genre, plot, cast });
    await movie.save();
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id", async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id).populate("cast");
      res.render("movies/movie-details", { movie });
    } catch (error) {
      next(error);
    }
  });

// Show the form to edit a movie
router.get("/movies/:id/edit", async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id).populate("cast");
      const celebrities = await Celebrity.find();
      res.render("movies/edit-movie", { movie, celebrities });
    } catch (error) {
      next(error);
    }
  });
  
  router.post('/movies/:id/edit', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, genre, plot, cast } = req.body;
      const updatedMovie = await Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true });
      res.redirect(`/movies/${updatedMovie._id}`);
    } catch (error) {
      next(error);
    }
  });
  
router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;