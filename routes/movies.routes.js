// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

// all your routes here

// GET route to get
router.get("/movies/create", async (req, res) => {
  try {
    // Find all the celebs inside the collection
    let allCelebritiesFromDb = await Celebrity.find();

    res.render("movies/new-movie.hbs", { celebrities: allCelebritiesFromDb });
  } catch (error) {
    console.log(error);
  }
});

router.post("/movies/create", (req, res) => {
  const { tittle, genre, plot, cast } = req.body;

  async function createMovieInDb() {
    try {
      let createMovie = await Movie.create({
        tittle,
        genre,
        plot,
        cast,
      });

      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  }
  createMovieInDb();
});

// GET route to retrieve and display all the movies
router.get("/movies", (req, res) => {
  async function findAllMoviesFromDb() {
    try {
      // Find all the movies inside the collection
      let allMoviesFromDb = await Movie.find().populate("cast");

      // Render all movie from DB with hbs view
      res.render("movies/movies.hbs", { movies: allMoviesFromDb });
    } catch (error) {
      console.log(error);
    }
  }
  findAllMoviesFromDb();
});

//Getting movies id so we can detail each one
router.get("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Find the movie by ID and populate the cast details
    const movie = await Movie.findById(movieId).populate("cast");

    // Render the movie details view with the movie object
    res.render("movies/movie-details.hbs", { movie });
  } catch (error) {
    console.log(error);
  }
});

//Deleting movies
router.post("/movies/:id/delete", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Delete movie by ID
    await Movie.findByIdAndRemove(movieId);

    // Redirect to the list of movies page
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

//get route to edit a movie

module.exports = router;
