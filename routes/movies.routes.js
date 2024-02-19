const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");

// // GET route to render the new-movie form view
// router.get("/movies/create", async(req, res) => {
//   // Logic to render the form goes here
//   // This will render your new-movie form view (new-movie.hbs)
//   res.send("Route is working!");
// });

// POST route to handle form submission and create a new movie
router.post("/movies/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Movie.create({ title, genre, plot, cast });
    //   try {
    //     const { title, genre, plot, cast } = req.body;

    //     // Assuming 'cast' contains an array of celebrity IDs
    //     const newMovie = await Movie.create({
    //       title,
    //       genre,
    //       plot,
    //       cast, // This should be an array of Celebrity IDs
    //     });

    res.redirect("/movies"); // Redirect to the movies index view
  } catch (error) {
    res.render("movies/new-movie");
    //     // Handle errors appropriately
    //     console.error("Error creating new movie:", error);
    //     res.redirect("/movies/create"); // Redirect back to the form with an error message
    //   }
  }
});

router.get("/movies/create", (req, res) => {
  res.render("movies/new-movie"); // Renders the new-celebrity view
});

module.exports = router;
