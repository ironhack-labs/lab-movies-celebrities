// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
// all your routes here

// GET route to retrieve and display all the movies
router.get("/movies", (req, res) => {
  async function findAllMoviesFromDb() {
    try {
      // Find all the movies inside the collection
      let allMoviesFromDb = await Movie.find();

      // Feedback regarding to found movies
      // console.log('Retrieved movies from DB:', allMoviesFromDb);

      // Render all moviess from DB with hbs view
      res.render("movies/movies.hbs", { movies: allMoviesFromDb });
    } catch (error) {
      console.log(error);
    }
  }
  findAllMoviesFromDb();
});

// GET route to display the form
router.get("/movies/create", (req, res) => {
  res.render("movies/new-movie.hbs");
});

// POST route to save a new movie to the database in the movies collection
router.post("/movies/create", (req, res) => {
  //console.log(req.body);

  // destructuring the req.body object
  const { title, genre, plot, cast } = req.body;

  async function createMovieInDb() {
    try {
      // Creating the Movie in Db
      let createdMovie = await Movie.create({ title, genre, plot, cast });
      //Feedback regarding the Movie Created in Db
      ///console.log(`New movie created: ${createdMovie.title} `);
      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  }

  createMovieInDb();
});

// GET route to display the form to update a specific movie
router.get("/movies/:movieId/edit", (req, res) => {
  // Destructuring the req.params.movieId object
  const { movieId } = req.params;

  // Feedback regarding req.params.movieId
  // console.log(movieId);

  async function findInfoFromAMovie() {
    try {
      // get info of the movie we want to edit
      let movieToEdit = await Movie.findById(movieId);
      // Render info with hbs view
      res.render("movies/edit-movie.hbs", { movie: movieToEdit });
    } catch (error) {
      console.log(error);
    }
  }

  findInfoFromAMovie();
});

// POST route to actually make updates on a specific movie

router.post("/movies/:movieId/edit", (req, res) => {
  // destructuring the req.params.movieId
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;

  async function updateAMovieFromDb() {
    try {
      let updatedMovie = await Movie.findByIdAndUpdate(
        movieId,
        { title, genre, plot, cast },
        { new: true }
      );
      res.redirect(`/movies/${updatedMovie._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  updateAMovieFromDb();
});

// POST route to delete a movie from the database

router.post("/movies/:movieId/delete", (req, res) => {
  const { movieId } = req.params;

  async function deleteAMovieFromDb() {
    try {
      let deletedMovie = await Movie.findByIdAndDelete(movieId);
      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  }
  deleteAMovieFromDb();
});

////////////////////////

module.exports = router;
