const router = require("express").Router();
const MovieModel = require("../models/movie.model");
const CelebrityModel = require("../models/Celebrity.model");

router.get("/all", async (req, res) => {
  const allMovies = await MovieModel.find();
  res.render("movies/movies", { allMovies });
});

router.get("/create", async (req, res) => {
  const allActors = await CelebrityModel.find({ occupation: "Actor" });
  const allDirectors = await CelebrityModel.find({ occupation: "Director" });
  res.render("movies/new-movie", { allActors, allDirectors });
});

router.post("/create", async (req, res) => {
  try {
    await MovieModel.create(req.body);
    res.redirect("/movies/all");
  } catch (err) {
    console.log("there was an error", err);
    res.redirect("/movies/create");
  }
});

router.get("/edit/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const oldMovie = await MovieModel.findById(movieId).populate("cast");
  const allActors = await CelebrityModel.find({ occupation: "Actor" });
  const allDirectors = await CelebrityModel.find({ occupation: "Director" });
  res.render("movies/edit-movie", { oldMovie, allActors, allDirectors });
});

router.post("/edit/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    await MovieModel.findByIdAndUpdate({ _id: movieId }, req.body);
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
