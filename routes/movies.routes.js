// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/movies", { movie: movies });
    })
    .catch();
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebs) => {
      res.render("movies/new-movie", { celebsArr: celebs });
    })
    .catch((err) => {
      console.log("Error displaying form...", err);
    });
});

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const movieDetails = { title, genre, plot, cast };
  Movie.create(movieDetails)
    .then(() => res.redirect("/movies"))
    .catch((err) => {
      res.render("movies/new-movie");
      console.log("error creating new movie:", err);
    });
});

router.get("/", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies/movies", {
        movie: allMovies,
      });
    })
    .catch((err) => {
      console.log("Error showing movies list...", err);
    });
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movies) => {
      res.render("movies/movie-details", movies);
    })
    .catch((err) => {
      console.log("Error showing movies list...", err);
    });
});

module.exports = router;
