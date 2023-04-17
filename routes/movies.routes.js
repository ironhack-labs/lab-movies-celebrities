// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((allTheCelebritiesFromDB) => {
      res.render("movies/new-movie.hbs", {
        celebrities: allTheCelebritiesFromDB,
      });
    })
    .catch((error) => next(error));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => next(error));
});

router.get("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;
  let movie;

  Movie.findById(movieId)
    .then((theMovie) => {
        movie = theMovie;
        return Celebrity.find()
    })
    .then((allTheCelebritiesFromDB) => res.render("movies/edit-movie.hbs", { movie, celebrity: allTheCelebritiesFromDB }))
    .catch((error) => next(error));
});

router.post("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then((editedMovie) => res.redirect(`/movies/${editedMovie.id}`))
    .catch((error) => next(error));
});

router.post("/movies/:movieId/delete", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      console.log("Error while deleting movie: ", error);

      next(error);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allTheMoviesFromDB) => {
      console.log("Retrieved movies from DB:", allTheMoviesFromDB);
      res.render("movies/movies.hbs", { movies: allTheMoviesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      next(error);
    });
});

router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate("cast")
    .then((theMovie) =>
      res.render("movies/movie-details.hbs", { movie: theMovie })
    )
    .catch((error) => {
      console.log("Error while retrieving movie details: ", error);

      next(error);
    });
});

module.exports = router;
