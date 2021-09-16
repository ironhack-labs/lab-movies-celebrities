// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie", { allCelebrities });
    })
    .catch((error) => {
      console.log("arr!!");
    });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => res.redirect("/movies"))
    .catch((error) => res.render("movies/new-movie"));
});

router.get("/", (req, res) => {
  Movie.find()
    .then((allMovies) => {
      console.log(allMovies);
      res.render("movies/movies", { allMovies });
    })
    .catch((error) => {
      console.log("arr!!");
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/movie-details", { movie });
    })
    .catch((error) => {
      console.log("err!!");
    });
});

router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((deletedMovie) => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("arr!!");
    });
});

module.exports = router;
