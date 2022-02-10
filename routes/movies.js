const async = require("hbs/lib/async");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  const allMovies = await Movie.find({});
  try {
    return res.render("movies/movies", {
      data: allMovies,
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET new movie */
router.get("/new-movie", (req, res, next) => {
  try {
    return res.render("movies/new-movie");
  } catch (error) {
    console.log(error);
  }
});

/* POST new movie */
router.post("/new-movie", async (req, res, next) => {
  console.log(req.body);
  const { title, genre, plot } = req.body;
  // console.log(`title:${title},genre:${genre},plot:${plot}`)
  try {
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

/* GET movie details */
router.get("/:id", async (req, res, next) => {
  //   console.log(req.params);
  const { id } = req.params;
  try {
    const foundMovie = await Movie.findById(id);
    console.log(foundMovie);
    return res.render("movies/movie-details", {
      data: foundMovie,
    });
  } catch (error) {
    console.log(error);
  }
});

/* POST movie details - delete movie */
router.post("/:id/delete", async (req, res, next) => {
  //   console.log(req.params);
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    console.log(deletedMovie);
    return res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

/* GET edit movie */
router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundMovie = await Movie.findById(id);
    console.log(foundMovie);
    return res.render("movies/edit-movie", {
      data: foundMovie,
    });
  } catch (error) {
    console.log(error);
  }
});

/* POST edit movie */
router.post("/:id/edit", async (req, res, next) => {
  //   console.log(req.params);
  const { id } = req.params;
  const { title, genre, plot } = req.body;
  try {
    const editedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, plot },
      { new: true }
    );
    console.log(editedMovie);
    return res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
