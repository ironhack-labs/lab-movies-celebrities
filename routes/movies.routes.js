// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require ("../models/Celebrity.model.js")

// all your routes here
    router.get("/movies/create", async (req, res) => {
      try {
        // Find all the celebs inside the collection 
        let allCelebritiesFromDb = await Celebrity.find();
    
        res.render("movies/new-movie", { celebrities: allCelebritiesFromDb });
      } catch (error) {
        console.log(error);
      }
    });
    

// POST route to save a new movie in database
router.post("/movies/create", (req, res) => {
  // destructuring the req.body 
  const { title, genre, plot, cast } = req.body;

  async function createMovieInDb() {
    try {
      // Creating the movie in Db
      let newdMovie = await Movie.create({ title, genre, plot, cast });

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
      let allMoviesFromDb = await Movie.find().populate("cast");;

      // Render all movie from DB with hbs view
      res.render("movies/movies.hbs", { movies: allMoviesFromDb });
    } catch (error) {
      console.log(error);
    }
  }
  findAllMoviesFromDb();
});


//getting movies id so we can show detail of each one
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


//deleting movies
router.post("/movies/:id/delete", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Delete the movie by ID
    await Movie.findByIdAndRemove(movieId);

    // Redirect to the list of movies page
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

//editting movies
//get route


router.get("/movies/:id/edit", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Find the movie by ID
    const movie = await Movie.findById(movieId);

    // Find all celebrities for the cast
    const celebrities = await Celebrity.find();

    // Render the edit movie view with the movie and celebrities data
    res.render("movies/edit-movie.hbs", { movie, celebrities });
  } catch (error) {
    console.log(error);
  }
});

//post route
router.post("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Get the updated values from the form submission
    const { title, genre, plot, cast } = req.body;

    // Find the movie by ID and update its values
    await Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast });

    // Redirect back to the movie details page
    res.redirect(`/movies/${movieId}`);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
