// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

// Iteration #6: Adding New Movies

// GET route to display a form where the user is going to fill info about the movies that are going to be created

router.get("/movies/create", async (req, res) => {
  try {
    const celebritiesFromDb = await Celebrity.find();
    res.render("movies/new-movie.hbs", { celebrities: celebritiesFromDb });
  } catch (error) {
    console.log(error);
  }
});

//POST route to submit info about the created movies

router.post("/movies/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;

    await Movie.create({ title, genre, plot, cast });

    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

// Iteration #7: Listing Our Movies
router.get("/movies", async (req, res) => {
  try {
    let allMoviesFromDB = await Movie.find();

    res.render("movies/movies.hbs", { movies: allMoviesFromDB });
  } catch (error) {
    console.log(error);
  }
});


//Iteration #8: The Movie Details Page
router.get("/movies/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;

    let foundMovie = await Movie.findById(movieId).populate("cast");

    res.render("movies/movie-details.hbs", foundMovie);
  } catch (error) {
    console.log(error);
  }
});

//Iteration #9: Deleting Movies
router.post("/movies/:movieId/delete", async (req, res) => {
  try {
    const { movieId } = req.params;
    await Movie.findByIdAndRemove(movieId);

    res.redirect('/movies');
  } catch (error) {
    console.log(error);
  }
});


// Iteration #10: Editing Movies
router.get('/movies/:movieId/edit', async (req, res) => {
  try {
    const { movieId } = req.params;
    let foundMovie = await Movie.findById(movieId);
    let celebrities = await Celebrity.find();

    res.render('movies/edit-movie.hbs', { movie: foundMovie, celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post('/movies/:movieId/edit', async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;

    await Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast });

    res.redirect('/movies');

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
