const router = require("express").Router();
const { Movie } = require("../models/Movie.model");
const { Celebrity } = require("../models/Celebrity.model");

// all your routes here
router.get("/movies", async (req, res) => {
  const allMovies = await Movie.find();
  res.render("movies/movies", { movies: allMovies });
});

router.get("/movies/create", async (req, res) => {
  const allCelebrities = await Celebrity.find();
  res.render("movies/new-movie", { celebrities: allCelebrities });
});

router.post("/movies/create", async (req, res) => {
  try {
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.redirect("/movies");
  } catch (err) {
    res.render("error");
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const foundMovie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { movie: foundMovie });
  } catch (err) {
    res.render("error");
  }
});

router.post("/movies/:id/delete", async (req, res) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    res.render("error");
  }
});

router.get("/movies/:id/edit", async (req, res) => {
  try {
    const foundMovie = await Movie.findById(req.params.id).populate("cast");
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", {
      movie: foundMovie,
      celebrity: celebrities,
    });
  } catch (err) {
    res.render("error");
  }
});

router.post("/movies/:id", async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/movies");
  } catch (err) {
    res.render("error");
  }
});

module.exports = router;

// router.get("/celebrities/create", (req, res) => {
//   res.render("celebrities/new-celebrity");
// });

// router.post("/movies/create", async (req, res) => {
//   try {
//     const newMovie = new Movie({ ...req.body });
//     await newMovie.save();
//     res.redirect("/movies");
//   } catch (err) {
//     res.render("movies/new-movie");
//   }
// });
