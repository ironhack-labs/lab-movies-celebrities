const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// Render a form to create a new movie
router.get("/create", async (req, res) => {
    try {
      const celebrities = await Celebrity.find({});
      res.render("movies/new-movie", { celebrities });
    } catch (error) {
      console.log(error);
    }
  });
  
  // Create a new movie and save it to the database
  router.post("/create", async (req, res) => {
    try {
      const { title, genre, plot, cast } = req.body;
      const newMovie = await Movie.create({ title, genre, plot, cast });
      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  });
  router.get('/', async (req, res, next) => {
    try {
      const movies = await Movie.find();
      res.render('movies/movies', { movies });
    } catch (err) {
      next(err);
    }
  });
  router.get('/:id', (req, res, next) => {
    const movieId = req.params.id;
    Movie.findById(movieId).populate('cast').then((movie) => {
      res.render('movies/movie-details', { movie });
    }).catch((error) => {
      console.log(error);
      next(error);
    });
  });
  module.exports = router;