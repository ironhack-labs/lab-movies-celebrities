const Movie = require("../models/Movie.model");

const router = require("express").Router();

//CREATE: new movie
router.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
  const movieDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(movieDetails)
    .then( () => res.redirect("/movies"))
    .catch(() => res.redirect("/movies/create"));
});


//READ: List all Movies
router.get("/movies", (req, res, next) => {
    Movie
      .find()
      .then((movies) => {
        res.render("movies/movies", { movies });
      })
      .catch((err) => {
        console.log("Error getting celebrities from DB...", err);
        next(err);
      });
  });


module.exports = router;

