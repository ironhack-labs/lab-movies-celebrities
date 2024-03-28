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

// Iteration #8: The Movie Details Page

// Renders movie-details.hbs in the movies folder
// :id is a dynamic parameter representing the unique identifier of a specific movie. For example, if a client navigates to /movies/123, where 123 is the ID of a movie, it renders the movie-details.hbs template located in the views/movies folder.
// GET route to show a specific movie
router.get("/:id", (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  Movie.findById(id)
    .populate("cast") // Because 'cast' is the field in Movie model that references Celebrity model
    .then((movie) => {
      if (!movie) {
        return res.status(404).send("Movie not found.");
      }
      res.render("movies/movie-details", { movie });
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      res.status(500).send("Error retrieving movie from the database.");
    });
});

// // Renders edit-movie.hbs in the movies folder
// router.get("/:id/edit", (req, res) => {
//   res.render("movies/edit-movie");
// });

// Iteration #9: Deleting Movies - Back-end-part
router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => {
      //  // Redirect to the movies list page once the movie is successfully deleted
      res.redirect("/movies");
    })
    .catch((error) => {
      // Handle errors, such as the movie not found or database errors
      console.error("Error deleting the movie:", error);
      res.status(500).send("Error deleting the movie");
    });
});

// Iteration #10: Editing Movies
// Route GET to Show a form to edit a movie
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  // Retrieve the specific movie
  Movie.findById(id)
    .then((movie) => {
      // Retrieve all celebrities to select for the cast
      Celebrity.find()
        .then((celebrities) => {
        // Make celebrities selected if they are in the movie's cast
        const options = celebrities.map((celebrity) => {
          return {
            // Converts the Mongoose document into a plain JavaScript object. This is necessary.
            ...celebrity.toObject(),            
            // Converting the ID to a string for comparison is necessary due to the way MongoDB and Mongoose handle document IDs.
            selected: movie.cast.includes(celebrity._id.toString()),
          };
        });

        res.render("movies/edit-movie", {
          movie: movie.toObject(),
          celebrities: options,
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      res.status(500).send("Error retrieving movie from the database.");
    });
});

// Route POST to Send the data from the form to this route to update the specific movie
router.post("/:id", (req, res) => {
  // This line extracts the id parameter from the route parameters (req.params). When you have a route like /movies/:id/edit, :id is a placeholder in the URL for the unique identifier of a movie. This part of the URL is accessible in your Express route handler through req.params.id. By using destructuring, you're directly extracting the id value into a constant named id. Purpose: Specifically, this id is used to identify which movie document to update or delete in the database.
  const { id } = req.params;

  // This line extracts title, genre, plot, and cast properties from the request body (req.body). When a form is submitted to update a movie, the data entered into the form fields is sent in the request body. The names of these fields in the request body match the names of the input fields in your form. Purpose: These extracted values are used to update the movie document in the database with new data provided by the user.
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => res.redirect(`/movies/${updatedMovie._id}`)) // Go to the details page to see the updates
    .catch((error) => next(error));
});
module.exports = router;
