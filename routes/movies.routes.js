const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error retrieving movies from database");
    });
});

router.get("movie/:id", (req, res, next) => {
  const id = req.params.id

  Movie.findById(ObjectId(id))
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error retrieving movie details from database");
    });
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error retrieving celebrities from database");
    });
});

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  const newMovie = new Movie({ title, genre, plot, cast });

  newMovie
    .save()
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error adding new movie to database");
    });
});

module.exports = router;
