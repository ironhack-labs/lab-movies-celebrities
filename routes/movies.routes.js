const router = require("express").Router();

const { Movie } = require("../models/Movie.model");
const { Celebrity } = require("../models/Celebrity.model");

router.get("/", async (req, res, next) => {
  const movies = await Movie.find();
  res.render("./movies/movies", { movies });
});

router.get("/create", async (req, res, next) => {
  const celebrities = await Celebrity.find();

  res.render("./movies/new-movie", { celebrities });
});

router.post("/create", async (req, res, next) => {
  try {
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.redirect("/movies");
  } catch (err) {
    res.render("error");
  }
});

router.get("/:id", async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  await movie.populate("cast");
  res.render("./movies/movie-details", { movie });
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    res.render("error");
  }
});

router.get("/:id/edit", async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  //await movie.populate("cast");
  const celebrities = await Celebrity.find();
  res.render("./movies/edit-movie", { movie, celebrities });
});

router.post("/:id/edit", async (req, res, next) => {
  console.log("here");
  try {
    await Movie.findOneAndUpdate({ _id: req.params.id }, { ...req.body }); //sanitizedBody
    res.redirect("/movies");
  } catch (err) {
    console.log("here");
    res.render("error");
  }
});

module.exports = router;
