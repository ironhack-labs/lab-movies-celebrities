const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  MovieModel.create({ title, genre, plot, cast })
    .then((result) => {
      console.log("new Movie was created: " + result);
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("An error occured while creating a New Movie: " + error);
      res.render("/movies/new-movie");
    });
});

router.get("/movies", (req, res) => {
  MovieModel.find()
    .then((movies) => {
      console.log("Movies found in db: ", movies);

      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log("Something went wrong while getting movies list: ", error);
    });
});

router.get("/movies/create", (req, res) => {
  CelebrityModel.find().then((celebrities) => {
    console.log(celebrities);
    res.render("movies/new-movie", { celebrities });
  });
});

router.get("/movies/:movieId", (req, res) => {
  const { movieId } = req.params;

  MovieModel.findById(movieId)
    .populate("cast")
    .then((movie) => {
      console.log("Movie found: ", movie);

      res.render("movies/movie-details", movie);
    })
    .catch((error) => {
      console.log("An error occured while getting movie details: ", error);
    });
});

module.exports = router;
