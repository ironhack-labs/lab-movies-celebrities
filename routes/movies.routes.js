// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie", { celebs: allCelebrities });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => res.redirect("/movies"))
    .catch((error) => res.render("movies/new-movie"));
});

router.get("/", (req, res) => {
  Movie.find()
    .then((allMovies) => {
      console.log(allMovies);
      res.render("movies/movies", { movies: allMovies });
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((oneMovie) => {
      console.log(oneMovie);
      res.render("movies/movie-details", { oneMovie });
    })
    .catch((error) => {
      console.log("err!!");
    });
});

module.exports = router;
