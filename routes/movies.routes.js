// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

//Adding a movie
router.get("/movies/create", async (req, res) => {
  try {
    let celebrities = await Celebrity.find();
    res.render("movies/new-movie.hbs", { celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post("/movies/create", async (req, res) => {
  const { title, genre, plot, cast } = req.body;
  await Movie.create({ title, genre, plot, cast });
  res.redirect("/movies");
});

//Display all movies
router.get("/movies", async (req, res) => {
  try {
    const allMoviesFromDB = await Movie.find();
    res.render("movies/movies.hbs", { movies: allMoviesFromDB });
  } catch (error) {
    console.log("Error while listing movies:", error);
  }
});

//Get movie details
router.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let movieDetails = await Movie.findById(id).populate("cast");
    console.log(movieDetails);

    res.render("movies/movie-details.hbs", movieDetails);
  } catch (error) {
    console.log(error);
  }
});

//Editing the movie

router.get("/movies/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const updateMovie = await Movie.findById(id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie.hbs", { updateMovie, celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post("/movies/:id/edit", async (req, res) => {
  try {
    //Destructure the req.params object to get the bookId
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    //update the same document with new content
    await Movie.findByIdAndUpdate(
      id,
      { title, genre, plot, cast },
      { new: true }
    );

    //redirect to books list page
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

//Delete movie

router.post("/movies/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
