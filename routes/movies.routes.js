const router = require("express").Router();
const MovieModel = require("../models/movie.model");
const CelebrityModel = require("../models/Celebrity.model");

router.get("/create", async (req, res) => {
  const allCelebrity = await CelebrityModel.find();
  console.log(allCelebrity);
  res.render("movies/new-movie", { allCelebrity });
});

router.get("/all", async (req, res) => {
  const allMovies = await MovieModel.find();
  res.render("movies/movies", { allMovies });
});

router.get("/edit", (req, res) => {
  res.render("movies/edit-movie");
});

router.get("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const oneMovie = await MovieModel.findById(movieId).populate("cast");
  res.render("movies/movie-details", { oneMovie });
});

router.post("/create", async (req, res) => {
  try {
    const newMovie = await MovieModel.create(req.body);
    console.log("New Movie Created ", newMovie);
    res.redirect("/movies/all");
  } catch (err) {
    console.log("there was an error", err);
    res.redirect("/movies/create");
  }
});

module.exports = router;
