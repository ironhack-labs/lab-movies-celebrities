// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
// all your routes here

router.get("/movies/create", (req, res, next) =>
  res.render("movies/new-movie")
);

router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });

    res.render("movies/new-movie");
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { allMovies });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId).populate("cast");
    res.render("movies/movie-detail", movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;

    await Movie.findByIdAndRemove(id);

    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    const celebrities = await Celebrity.find();

    res.render("movies/edit-movie", { movie, celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    await Movie.findByIdAndUpdate(id, { title, genre, plot, cast });
    res.redirect(`/movies/${id}/edit`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
