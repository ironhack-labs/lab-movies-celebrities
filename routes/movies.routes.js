const router = require("express").Router();
const movieModel = require("../models/Movie.model");
const celebrityModel = require("../models/Celebrity.model");

// ADD MOVIES
router.get("/create", (req, res) => {
  celebrityModel
    .find()
    .then((celebArr) => {
      res.render("movies/new-movie", { celebArr });
    })
    .catch((err) => console.log("Ups, that didn't work", err));
});

router.post("/create", (req, res) => {
  console.log(req.body);
  movieModel
    .create(req.body)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log("Oh, adding a movie did not work.", err));
});

//LIST ALL MOVIES OF THE DB
router.get("/", (req, res) => {
  movieModel
    .find()
    .then((allMovies) => {
      res.render("movies/movies", { allMovies });
    })
    .catch((err) =>
      console.log("Well, that's probably not what you expected, huh?", err)
    );
});

// DETAILS PAGE
router.get("/:id", (req, res) => {
  movieModel
    .findById(req.params.id)
    .populate("cast")
    .then((selectedMovie) => {
      console.log(selectedMovie);
      const { title, genre, plot, cast } = selectedMovie;
      res.render("movies/movie-details", { title, genre, plot, cast });
    })
    .catch((err) =>
      console.log("Displaying the movie details failed, sorry.", err)
    );
});

module.exports = router;
