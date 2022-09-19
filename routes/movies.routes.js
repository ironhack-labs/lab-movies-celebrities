// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { Movie } = require("../models/Movie.model");
const { Celebrity } = require("../models/Celebrity.model");

// all your routes here

router.get("/create", async (req, res, next) => {
  const celebrities = await Celebrity.find();
  res.render("movies/new-movie", { celebrities });
});

router.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.redirect("/movies");
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
    res.render("movies/new-movie");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log("req.params: ", req.params);
    const foundMovie = await Movie.findById(req.params.id);
    await foundMovie.populate("cast");
    res.render("movies/movie-details", {
      movie: foundMovie,
      id: req.params.id,
    });
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const movieToEdit = await Movie.findById(req.params.id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", {
      movie: movieToEdit,
      celebrities: celebrities,
    });
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const { title, genre, plot, cast } = req.body;
    const editedMovie = await Movie.findByIdAndUpdate(req.params.id, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

module.exports = router;
