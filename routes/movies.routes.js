const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    const celebritiesList = await Celebrity.find();
    res.render("movies/new-movie", { celebritiesList });
  } catch (error) {
    console.log(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const moviesList = await Movie.find();
    res.render("movies/movies", { moviesList });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", movie);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id/edit", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const celebritiesList = await Celebrity.find();
    res.render("movies/edit-movie", {
      movie,
      celebritiesList,
      movieCast: movie.cast,
    });
  } catch {}
});
router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    const createMovie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (error) {
    res.render("/movie/new-movie");
  }
});
router.post("/:id/delete", async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    res.render(`movies/${req.params.id}`);
  }
});
router.post("/:id", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect(`/movies/${req.params.id}`);
  } catch (error) {}
});

module.exports = router;
