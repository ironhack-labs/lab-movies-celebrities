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
  console.log("before");
  try {
    const foundMovie = await Movie.findById(req.params.id).populate("cast");
    console.log(foundMovie);
    res.render("movies/movie-details", { movie: foundMovie });
  } catch (err) {
    console.log(err);
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
