// There was a big problem here, the Route Order. Ensure the /create route is defined before any routes that include dynamic parameters like /:id.

// routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");

// Iteration #6: Adding New Movies

// GET route to show form for creating a new movie
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res) => {
  // Retrieve all celebrities from the database
  Celebrity.find()
    .then((celebrities) => {
      // Render the form to create a new movie, passing the list of celebrities
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      // If there's an error, render an error page or handle it accordingly
      res.status(500).send("Error retrieving celebrities from the database.");
    });
});

// POST route send the data from the form to this route to create the movie and save it to the database
router.post("/create", (req, res) => {
  // Extract data from the form submission
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies"); // Redirect to the list of all movies
    })
    .catch((error) => {
      // If there's an error, render the form again with an error message
      res.render("movies/new-movie", { error: error.message });
    });
});

// Iteration #7: Listing Our Movies

// GET route to show all movies
router.get("/", (req, res) => {
  // Retrieve all movies from the database
  Movie.find()
    .then((movies) => {
      // Render the page displaying all movies, passing the list of movies
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      // If there's an error, render an error page or handle it accordingly
      res.status(500).send("Error retrieving movies from the database.");
    });
});

// // Renders movies.hbs in the movies folder
// router.get("/", (req, res) => {
//   res.render("movies/movies");
// });

// Renders new-movie.hbs in the movies folder
router.get("/new", (req, res) => {
  res.render("movies/new-movie");
});

// Renders movie-details.hbs in the movies folder
// :id is a dynamic parameter representing the unique identifier of a specific movie. For example, if a client navigates to /movies/123, where 123 is the ID of a movie, it renders the movie-details.hbs template located in the views/movies folder.
router.get("/:id", (req, res) => {
  res.render("movies/movie-details");
});

// Renders edit-movie.hbs in the movies folder
router.get("/:id/edit", (req, res) => {
  res.render("movies/edit-movie");
});

module.exports = router;
