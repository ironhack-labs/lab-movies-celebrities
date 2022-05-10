// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const celebs = await Celebrity.find();
    res.render("movies/new-movie", { celebs });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("movies/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.render("movies/edit-movie", movie);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    const celebs = await Celebrity.find();
    await Movie.findByIdAndUpdate(
      id,
      {
        title,
        genre,
        plot,
        cast: celebs,
      },
      {
        new: true,
      }
    );
    res.redirect("/movies");
  } catch {}
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch {}
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.render("movies/movie-details", movie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
