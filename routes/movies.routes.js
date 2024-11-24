const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// GET route to display the form to create a new movie
router.get("/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find(); // Get all celebrities
    res.render("movies/new-movie", { celebrities }); // Pass celebrities to the view
  } catch (error) {
    console.error("Error fetching celebrities for movie form:", error);
    res.status(500).render("error", { error: "Failed to load the movie creation form." });
  }
});

// POST route to handle form submission and create a new movie
router.post("/create", async (req, res) => {
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.create({ title, genre, plot, cast }); // Save the movie
    res.redirect("/movies"); // Redirect to the movies list
  } catch (error) {
    console.error("Error creating movie:", error);
    res.render("movies/new-movie", { errorMessage: "Failed to create movie. Please try again." });
  }
});

// GET route to display all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("cast"); // Fetch all movies and populate cast
    res.render("movies/movies", { movies }); // Pass movies to the view
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).render("error", { errorMessage: "Failed to load movies." });
  }
});


// Route to display a movie's details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Populate all necessary fields of the cast
    const movie = await Movie.findById(id).populate("cast", "name occupation catchphrase");

    if (!movie) {
      return res.status(404).render("error", { errorMessage: "Movie not found." });
    }


    // Render the movie details page
    res.render("movies/movie-details", { movie });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).render("error", { errorMessage: "Failed to load movie details." });
  }
});


// Route to delete a movie
router.post("/:id/delete", (req, res) => {
  const { id } = req.params; // Get the movie id from the URL params
  
  // Find the movie by its id and remove it
  Movie.findByIdAndRemove(id)
    .then(() => {
      // Redirect to the list of movies after successful deletion
      res.redirect("/movies");
    })
    .catch((error) => {
      console.error("Error deleting movie:", error);
      res.status(500).render("error", { error: "Failed to delete movie. Please try again." });
    });
});

// GET route to render the edit form for a movie
router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  
  Movie.findById(id)
  .then((movie) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("movies/edit-movie", { movie, celebrities });
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});


// POST route to handle the editing of a movie
router.post("/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body; // grab form data

   // Update the movie in the database
  Movie.findByIdAndUpdate(
    id, req.body,
    { new: true }
  )
    .then(() => {
      res.redirect('/movies'); // redirect to the updated movie's details page
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;