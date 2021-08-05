const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

// Iteration#6 Adding New Movies
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie.hbs", { celebrities: celebritiesFromDB });
    })
    .catch((err) =>
      console.log(`Err while displaying movie input page: ${err}`)
    );
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("movies/new-movie.hbs"));
});

// Iteration#7 Listing Movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render("movies/movies.hbs", {
        movies: moviesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      next(error);
    });
});

// Iteration#10 Editing Movies
router.get("/movies/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;
  let allCelebrities;
  Celebrity.find()
  .then ((celebritiesFromDB)=>{
    allCelebrities = celebritiesFromDB;
    return Movie.findById(movieId).populate("cast");
  })
    .then((movieFromDB) => {
      let remainingCelebrities = allCelebrities.filter(celeb => celeb._id.toString() != movieFromDB.cast[0]._id.toString())
      res.render("movies/edit-movie.hbs", { movie: movieFromDB, remainingCelebrities });
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

// Iteration#9 Deleting Movies
router.post("/movies/:movieId/delete", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect("/movies"))
    .catch((error) => next(error));
});

// Iteration#8 The Movie Details Page
router.get("/movies/:movieId", (req, res) => {
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
