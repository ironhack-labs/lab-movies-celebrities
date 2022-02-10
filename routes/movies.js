const async = require("hbs/lib/async");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  const allMovies = await Movie.find({});
  try {
    await res.render("movies/movies", {
      data: allMovies,
    });
  } catch (error) {
    console.log(error);
  }
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

/* GET movie details */
router.get("/:id", async (req, res, next) => {
//   console.log(req.params);
  const { id } = req.params;
  const foundMovie = await Movie.findById(id);
  console.log(foundMovie);
  try {
    await res.render("movies/movie-details", {
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
    const deletedMovie = await Movie.findByIdAndDelete(id);
    console.log(deletedMovie);
    try {
      await res.redirect("/movies")
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
