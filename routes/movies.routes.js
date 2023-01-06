// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

// Show form to create movie
router.get("/movies/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  }
  catch (err) {
    console.log(err)
  }
});

// Send data from the form
router.post("/movies/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;

    const newMovie = await Movie.create({
      title,
      genre,
      plot,
      cast
    });
    res.redirect("movies");
  }
  catch (err) {
    console.log(err)
    res.redirect("/movies/create");
  }
});

// Show all movies
router.get("/movies/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  }
  catch (err) {
    console.log(err)
  }
});

// Show movie details
router.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details", movie);
  }
  catch (err) {
    console.log(err)
  }
});

// Delete movie
router.post("/movies/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndRemove(id);
    res.redirect("/movies/movies");
  }
  catch (err) {
    console.log(err)
    res.redirect("/movies/movies");
  }
});

// Show form to edit movie
router.get("/movies/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;

    const celebrities = await Celebrity.find();
    const editMovie = await Movie.findById(id).populate("cast");
    const { cast } = editMovie;

    for (let i = 0; i < celebrities.length; i++) {
      for (let j = 0; j < cast.length; j++) {
         if (celebrities[i].name === cast[j].name) {
          celebrities[i].inCast = true;
         }
      }
    }

    const data = { movie: editMovie, celebrities: celebrities }
    res.render("movies/edit-movie", data );
  }
  catch (err) {
    console.log(err)
  }
});

// Edit movie
router.post("/movies/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const editMovie = await Movie.findByIdAndUpdate(id, req.body, {new: true});
    res.redirect(`/movies/${id}`);
  }
  catch (err) {
    console.log(err)
    res.redirect("/movies/movies");
  }
});

module.exports = router;