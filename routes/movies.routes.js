const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie", { celebritiesArr: celebritiesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/create", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.create(newMovie)
    .then((newMovie) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render("movies/movies", { movies: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/:movieID", (req, res, next) => {
  Movie.findById(req.params.movieID)
    .populate("cast")
    .then((moviesByID) => {
      console.log(moviesByID);
      res.render("movies/movie-details", { movieID: moviesByID });
    });
});

router.post("/movies/:movieID/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieID)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/:movieID/edit", async (req, res, next) => {
  const { movieID } = req.params;
  try {
    const cast = await Celebrity.find();
    const movieDetail = await Movie.findById(movieID);
    res.render("movies/edit-movie", { movie: movieDetail, cast: cast });
  } catch (err) {
    next(err);
  }
});

router.post("/movies/:movieID/edit", (req, res, next) => {
  const { movieID } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieID, { title, genre, plot, cast }, { new: true })
    .populate("cast")
    .then((updatedMovie) => {
      res.redirect(`/movies/${updatedMovie.id}`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
