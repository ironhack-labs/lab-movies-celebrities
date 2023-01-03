const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = express.Router();

// GET route
router.get("/movies/create", (req, res, next) => {
  let celebritiesArr;
  Celebrity.find()
    .then((celebritiesFromDB) => {
      celebritiesArr = celebritiesFromDB;
      console.log(celebritiesArr);
    })
    .then((movieToAdd) => {
      //console.log(movieToAdd);
      const data = {
        celebritiesArr: celebritiesArr,
      };
      res.render("movies/new-movie", data); // <-- add this line
    })
    .catch((error) => next(error));
});

// POST route
router.post("/movies", (req, res, next) => {
  console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      console.log("Error inserting Movie into DB", error);
      res.redirect("/movies/create");
    });
});

/* GET ALL movies */
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies/movies", { movies: moviesFromDB });
    })
    .catch((error) => {
      console.log("Error getting movies from DB", error);
      next();
    });
});

/* GET movie details */
router.get("/movies/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate("cast");
    res.render("movies/movie-details", movie);
  } catch (error) {
    console.log(error);
  }
});


// POST Delete movies

router.post('/movies/:id/delete', (req, res, next) => {

    Movie.findByIdAndDelete(req.params.id)
      .then(() => res.redirect(`/movies`)) 
      .catch(error => next(error));
  });
module.exports = router;
