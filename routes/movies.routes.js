const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

/* GET Movies page */
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.render("error", { error });
    });
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log("Error: ", err);
      res.render("error", { err });
    });
});

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const newMovie = new Movie({
    title,
    genre,
    plot,
    cast
  });
  // Saving the new movie to the database
  newMovie.save()
    .then(() => {
      res.redirect("/movies");
    })
    .catch(error => {
      console.log("Error: ", err),
      res.render("movies/new-movie", { err });
    });
});


module.exports = router;
