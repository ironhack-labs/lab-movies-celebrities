// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movies = require("../models/movie.model");

//CREATE: display form
router.get("/movies/create", (req, res, next) => {
  Movies.find()
    .then((moviesFromDB) => {
      res.render("movies/new-movie", moviesFromDB);
    })
    .catch((err) => {
      console.log("oops, we could not create it");
    });
});

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movies.create(newMovie)
    .then((newMovie) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error creating new movie");
      res.redirect("movies/new-movie");
    });
});

// READ: display all movies
router.get("/movies", (req, res, next) => {
  Movies.find()
    .then((moviesFromDB) => {
      const data = {
        movies: moviesFromDB,
      };
      // console.log(data);
      res.render("movies/movies", data);
    })
    .catch((err) => {
      console.log("I can't do it");
    });
});

// READ: display all movies details
router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  // console.log(movieId);
  // const { title, genre, plot, cast } = req.body;

  Movies.findById(movieId)
    // .populate("movies")
    .then((movieFromDB) => {
      res.render("movies/movie-details", movieFromDB);
    })
    .catch((err) => {
      console.log("I can't do it");
    });
});

// DELETE: delete movie
router.post('/movies/:movieId/delete', (req, res, next) => {
  const movieId = req.params.movieId;
  // console.log(req.params.movieId);
  Movies.findByIdAndDelete(movieId)
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
});

module.exports = router;
