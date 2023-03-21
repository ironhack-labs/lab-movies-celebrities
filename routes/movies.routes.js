const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// GET the create form
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((response) => {
      const data = {
        celebritiesArray: response,
      };

      res.render("movies/new-movie", data);
    })
    .catch((err) => {
      console.log("error when finding celebreties list. ", err);
      console.error(err);
    });
});

// POST create a new movie
router.post("/movies/create", (req, res, next) => {
  // console.log(req.body);
  Movie.create(req.body)
    .then((result) => {
      // console.log(result);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Could not create new movie. ", err);
      console.error(err);
      res.redirect("/movies/create");
    });
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((response) => {
      console.log(response);
      res.render("movies/movie-details", response);
    })
    .catch((err) => {
      console.log("Could not get movie from DB. ", err);
      console.error(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((response) => {
      const data = {
        moviesArray: response,
      };
      res.render("movies/movies", data);
    })
    .catch((err) => {
      console.log("Could not find movies from DB. ", err);
      console.error(err);
    });
});

module.exports = router;
