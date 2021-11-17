const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

//GET movies route
router.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movie.find({});
    res.render("movies/movies", { allMovies });
    console.log(allMovies);
  } catch (err) {
    console.log(err);
  }
});

//GET create-movie route

router.get("/movies/create", async (req, res) => {
  try {
    const allCelebrities = await Celebrity.find({});
    res.render("./movies/newMovie", { allCelebrities });
  } catch (err) {
    console.log(err);
  }
});

//POST (when the form of create movie is filled)
router.post("/movies/create", async (req, res) => {
  const { title, genre, plot, cast } = req.body;

  try {
    const createdMovie = await Movie.create({ title, genre, plot, cast });
    if (createdMovie) {
      res.redirect("/movies");
    } else {
      res.render("./movies/newMovie", {
        errMsg: "There is an error creating a new Movie. Please try again",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//GET movies by its ID
router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render("./movies/movieDetails", movie);
  } catch (err) {
    console.log(err);
  }
});

//POST movies for deleting by its ID
router.post("/movies/:id/delete", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
  }
});

//GET movies for editing
router.get("/movies/:id/edit", async (req, res) => {
  try {
    const updatedMovie = await Movie.findById(req.params.id).populate("cast");
    const castCelebrity = await Celebrity.find({});
    res.render("./movies/editMovie", {
      movie: updatedMovie,
      castCelebrity: castCelebrity,
    });
  } catch (err) {
    console.log(err);
  }
});

//POST movies for editing
router.post("/movies/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body);
    console.log(updatedMovie);
    res.redirect(`/movies/${updatedMovie.id}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
