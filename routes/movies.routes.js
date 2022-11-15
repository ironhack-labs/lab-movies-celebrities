const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();

    res.render("movies/movies", {
      movies,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/movie-new", {
      celebrities,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, casts } = req.body;

  try {
    await Movie.create({ title, genre, plot, casts });
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

router.get("/:movieId/edit", async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId).populate("casts");
    const celebreties = await Celebrity.find();

    res.render("movies/movie-edit", {
      movie,
      celebreties,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:movieId/edit", async (req, res, next) => {
  const { title, genre, plot, casts } = req.body;

  try {
    const movie = await Movie.findOneAndUpdate({
      title,
      genre,
      plot,
      casts,
    }).populate("casts");

    res.redirect(`/movies/${movie.id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/:movieId/delete", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    await Movie.findByIdAndDelete(movieId);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

router.get("/:movieId", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId).populate("casts");
    res.render("movies/movie-details", {
      movie,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
