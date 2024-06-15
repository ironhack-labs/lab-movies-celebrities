const { Router } = require("express");
const router = new Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/create", async (req, res, next) => {
  const celebrities = await Celebrity.find();
  res.render("movies/new-movie", { celebrities });
});

router.post("/create", async (req, res, next) => {
  try {
    console.log(req.body);
    await Movie.create(req.body);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.redirect("/movies/create");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    console.log(movie);
    res.render("movies/movie-details", movie);
  } catch (error) {
    console.log(error);
    res.redirect("/movies");
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", {
      movie,
      celebrities,
      selectedMovieCelebritiesIds: movie.cast.map((celebrity) => celebrity._id.toString()),
    });
  } catch (error) {
    console.log(error);
    res.redirect("/movies");
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/movies/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/movies");
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/movies");
});

module.exports = router;
