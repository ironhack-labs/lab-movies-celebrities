const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

const Movie = require("../models/Movie.model");

// all your routes here

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error getting celebrities from DB");
    });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      res.render("movies/new-movie");
      next(error);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      console.log("Retrieved movies from DB:", allMovies);
      res.render("movies/movies.hbs", { allMovies });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      next(error);
    });
});

router.get("/movies/:id/edit", (req, res) => {
  const movieId = req.params.id;
  Movie.findById(movieId).then((movie) => {
    Celebrity.find().then((celebrity) => {
      res.render("movies/edit-movie", { movie, celebrity });
    });
  });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => res.redirect("movies/movie-details"))
    .catch((error) => next(error));
});

router.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/edit-movie", { movie });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/:id/delete", (req, res) => {
  const movieIdd = req.params.id;
  Movie.findByIdAndRemove(movieIdd)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

module.exports = router;
