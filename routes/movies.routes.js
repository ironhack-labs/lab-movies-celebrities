const Movies = require("../models/Movies.model");
const Celebrities = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/movies/create", (req, res, next) => {
  Celebrities.find()
    .then((data) => {
      res.render("movies/new-movie", { celebrities: data });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/movies/create", (req, res, next) => {
  const movieInfo = {
    title: req.body.title,
    genre: req.body.genre,
    cast: req.body.cast,
    plot: req.body.plot,
  };

  Movies.create(movieInfo)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("can't create movie in db", err);
    });
});

router.get("/movies", (req, res, next) => {
  Movies.find()
    .then((moviesArr) => {
      res.render("movies/movies", { movies: moviesArr });
    })
    .catch((error) => {
      console.log("got an error loading movies", error);
    });
});

router.get("/movies/:movieId", (req, res, next) => {
  Movies.findById(req.params.movieId)
    .populate("cast")
    .then((movieData) => {
      res.render("movies/movie-details", { movieInfo: movieData });
    })
    .catch((error) => {
      console.log("error getting movie data", error);
    });
});

router.post("/movies/:movieId/delete", (req, res, next) => {
  Movies.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
