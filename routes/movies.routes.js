// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//Create movies from the DB
//and read existing celebrities from the DB
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      const data = {
        celebrities: celebritiesFromDb,
      };
      res.render("movies/new-movie", data);
    })
    .catch((e) => {
      console.log(e, "error getting celebrities");
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
    .catch((e) => {
      //console.log("error creating new celebrity", e);
      // next(e);
      res.render("movies/new-movie");
    });
});

// Lists the movies in the DB
router.get("/movies", (req, res, next) => {
  Movie.find()
    // .populate("cast")
    .then((moviesFromDb) => {
      const data = { movies: moviesFromDb };
      console.log(data);
      res.render("movies/movies", data);
    })
    .catch((e) => {
      console.log(e, "error getting movies");
    });
});

// router.get("/movies/:movieId", (req, res, next) => {
//     const id = req.params.movieId;

//     Movie.findById(id)
//     //.populate("celebrity")
//     .then( moviesfromDB => {
//         res.render("movies/movie-details",
//         moviesFromDb) ----..
//     })
// })

module.exports = router;
