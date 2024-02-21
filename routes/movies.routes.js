// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log("Movie GET error: ", error);
      next(error);
    });
});

router.post("/movies/create", (req, res, next) => {
  // console.log("The form data: ", req.body);
  const { title, genre, plot, cast } = req.body;
  return Movie.create({ title, genre, plot, cast })
    .then((allMovies) => {
      //console.log("Response statusCode: ", res.statusCode);
      if (res.statusCode !== 200) {
        res.render("movies/new-movie", {
          movies: allMovies,
        });
      } else {
        res.redirect("/movies");
      }
    })
    .catch((error) => {
      console.log("Movie create error: ", error);
      next(error);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate()
    .then((allMovies) => {
      res.render("movies/movies", { movies: allMovies });
    })
    .catch((error) => {
      console.log("Movie error: ", error);
      next(error);
    });
});

router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate("cast")
    .then((theMovie) => res.render("movies/movie-details", { movie: theMovie }))
    .catch((error) => {
      console.log("Error while getting movies from DB: ", error);
      // call the middleware-error to display error page to the user
      next(error);
    });
});

router.post("/movies/:movieId/delete", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndDelete(movieId)
    .then((movie) => res.redirect("/movies"))
    .catch((error) => next(error));
});

router.get("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate("cast")
    .then((movietoEdit) => {
      Celebrity.find().then((celebrities) => {
        res.render("movies/edit-movie", { movie: movietoEdit, celebrities });
      });
    })
    .catch((error) => next(error));
});

router.post("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => res.redirect(`/movies/${updatedMovie.id}`))
    .catch((error) => next(error));
});

module.exports = router;
