const { populate } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

/* CREAT new movie */
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((castArr) => {
      // console.log(castArr)
      res.render("movies/new-movie", { casts: castArr });
    })
    .catch(err => {
      console.log("error creating movies from DB", err)
      next(err);
    });
})


router.post("/create", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  }
  // console.log(newCelebrity)
  Movie.create(newMovie)
    .then((moviesFromDb) => {
      console.log(moviesFromDb)
      res.redirect("/movies");
    })
    .catch(err => {
      console.log("error creating movies from DB", err)
      next(err);
    });
});


/* READ list movies */
router.get("/", (req, res, next) => {
  Movie.find()
    .then(allMovies => {
      res.render("movies/movies", { movies: allMovies })
    })
})


/* READ movie in detail */
router.get("/:movieId", (req, res, next) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .populate("cast")
    .then(movieDetails => {
      res.render("movies/movie-details", { movie: movieDetails })
    })
    .catch((err) => console.log(err));
})



/* UPDATE */
router.get("/:movieId/edit", (req, res, next) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .populate("cast")
    .then(movieEdit => {
      res.render("movies/edit-movie", movieEdit)
    })
    .catch((err) => console.log(err));
})

router.post("/:movieId/edit", (req, res, next) => {
  const id = req.params.movieId;
  const newMovieEdited = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  }
  Movie.findByIdAndUpdate(id, newMovieEdited)
    .then(movieUpdated => {
      res.redirect(`/movies/${movieUpdated._id}`);
    })
    .catch((err) => console.log(err));
})


/* DELETE */
router.post("/:movieId/delete", (req, res, next) => {
  const id = req.params.movieId;
  Movie.findByIdAndRemove(id,)
    .then((response) => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
})








module.exports = router;