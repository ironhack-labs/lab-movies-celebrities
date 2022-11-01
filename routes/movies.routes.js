// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

// Create - GET
router.get("/movies/create", async (req, res, next) => {
  try {
    const { id } = req.params;
    //get all the celebrities
    const celebrities = await Celebrity.find();
    //get the specific movie
    //single populate
    const movie = await Movie.findById(id);
    res.render("movies/new-movie", { movie, celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// Create - POST
router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;

    const createdMovie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect(`/movies`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// List - GET
router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Individual - GET
router.get("/movie-details/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    //get all the celebrities
    const celebrities = await Celebrity.find();
    //get the specific movie
    //single populate
    const movie = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details", { movie, celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Delete movie (no need for hbs file)
router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndRemove(id);
    // Em vez de fazer render, redirecciona para o livro acabado de editar
    res.redirect(`/movies/`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Display a página de Edit routes (edit-movie.hbs)
router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    const movie = await Movie.findById(req.params.id);
    res.render("movies/edit-movie", { movie, celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Receber a informação do EDIT form- POST (edit-movie.hbs)
router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(id, {
      title,
      genre,
      plot,
      cast,
    });
    // Em vez de fazer render, redirecciona para o filme acabado de editar
    res.redirect(`/movie-details/${updatedMovie._id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
