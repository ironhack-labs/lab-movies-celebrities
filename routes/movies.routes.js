const router = require("express").Router();
const MovieModel = require("../models/movie.model");
const CelebrityModel = require("../models/Celebrity.model");

router.get("/create", async (req, res) => {
  const allCelebrity = await CelebrityModel.find();
  res.render("movies/new-movie", { allCelebrity });
});

router.get("/all", async (req, res) => {
  const allMovies = await MovieModel.find();
  res.render("movies/movies", { allMovies });
});

router.get("/edit/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const oldMovie = await MovieModel.findById(movieId).populate("cast");
  const allCelebrity = await CelebrityModel.find();
  res.render("movies/edit-movie", { oldMovie, allCelebrity });
});

router.post("/edit/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      { _id: movieId },
      req.body
    );
    console.log("Movie updated ", updatedMovie);
    res.redirect(`/movies/${movieId}`);
  } catch (err) {
    console.log("there was an error", err);
    res.redirect(`/movies/edit/${movieId}`);
  }
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

router.post("/:movieId/delete", async (req, res) => {
  try {
    const { movieId } = req.params;
    const deletedMovie = await MovieModel.findByIdAndRemove(movieId).then(
      () => {
        res.redirect("/movies/all");
      }
    );
  } catch (err) {
    console.log("There was an error", err);
  }
});

module.exports = router;
