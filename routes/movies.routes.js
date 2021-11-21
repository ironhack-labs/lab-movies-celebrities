//make a reference between function Router from express to our local variable router

const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// handle routes to movies here

router.get("/", async (req, res, next) => {
  const allMovies = await Movie.find();

  res.render("movies/movies", { allMovies });
});
router.get("/create", async (req, res, next) => {
  const allCelebs = await Celebrity.find();

  res.render("movies/new-movie", { allCelebs });
});

router.post("/create", async (req, res, next) => {
  console.log(req.body);
  try {
    const newMovie = req.body;
    await Movie.create(newMovie);
  } catch (error) {}
  res.redirect("/movies");
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movieDetails = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details", { movieDetails });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  const deleteThisMovie = req.params.id;
  await Movie.findByIdAndRemove(deleteThisMovie);

  res.redirect("/movies");
});
router.get("/:id/edit", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const allCelebs = await Celebrity.find();
    const movieData = await Movie.findById(movieId).populate("cast");

    // problem: How to show that a Celebrity is in Movie with Check Boxes
    // solution:

    // first create an Array to hold all celebritys in objects from the Database
    const castArr = [];

    // iterates through all Celebritys and pushes it in the CastArr with name of Celebrity, Id and sets an property to isInMovie to false in general
    allCelebs.forEach((element) => {
      castArr.push({ name: element.name, isInMovie: false, _id: element._id });
    });

    // iterates through castArr
    // in this iteration it iterates through the specific movieData cast of Movie. Its the list of the cast of the Movie
    // it checks if the Celebrity is in both. If its in both it sets the property 'isInMovie' to true;
    castArr.forEach((celebElement) => {
      movieData.cast.forEach((movieElement) => {
        if (celebElement.name === movieElement.name) {
          celebElement.isInMovie = true;
        }
      });
    });

    res.render("movies/edit-movie", { castArr, movieData });
  } catch (error) {
    console.error(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const newMovieData = req.body;
    console.log(newMovieData);
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, newMovieData, {
      new: true,
    });
    // res.render(`/movies/edit-movie`, { updatedMovie });
    res.redirect("/movies");
  } catch (error) {
    console.error(`error: ${error}`);
    res.redirect("/movies");
  }
});

//exports
module.exports = router;
