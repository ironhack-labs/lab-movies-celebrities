const CelebModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here
router.get("/movieslist", async (req, res) => {
  const allMovies = await MovieModel.find();
  res.render("movies/movies", { allMovies });
});

router.get("/create", async (req, res) => {
  const allCelebs = await CelebModel.find();
  res.render("movies/new-movie", { allCelebs });
});

router.post("/create", async (req, res) => {
  try {
    const newMovieCreated = await MovieModel.create(req.body);
    console.log("NEW MOVIE", newMovieCreated)
    res.redirect("/movies/movieslist");
  } catch (err) {
    res.redirect("/movies/create");
    console.log("movie post error", err);
  }
});

//   router.get("/celebs", async (req,res) => {
//       try {
//           const allCelebs = await CelebModel.find();
//           res.render("celebs/celebs", {allCelebs});

//       } catch {
//           res.send ("Oops, an error, go back");
//       }

//   })

module.exports = router;
