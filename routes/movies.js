const async = require("hbs/lib/async");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    await res.render("movies/movies");
  } catch (error) {
    console.log(error);
  }
});

/* GET movie details */
router.get("/movie-details", (req, res, next) => {
  res.render("movies/movie-details");
});

/* GET edit movie */
router.get("/edit-movie", (req, res, next) => {
  res.render("movies/edit-movie");
});

/* GET new movie */
router.get("/new-movie", async (req, res, next) => {
  try {
    res.render("movies/new-movie");
  } catch (error) {
    console.log(error);
  }
});

/* POST new movie */
router.post("/new-movie", async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, genre, plot } = req.body;
    // console.log(`title:${title},genre:${genre},plot:${plot}`)
    const newMovie = await Movie.create({
      title: title,
      genre: genre,
      plot: plot,
    });
    // console.log(newMovie);
    return res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
