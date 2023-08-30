// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require("../models/Movie.model");

// display form to add new movie
router.get("/movies/create", (req, res, next) => {
    Movies.find()
      .then((moviesFromDB) => {
        const data = {
          movies: moviesFromDB,
        };
        res.render("movies/new-movie", data);
      })
      .catch((e) => {
        console.log("Error to display form", e);
        next(e);
      });
  });

  // process form to add movie to database
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
    .catch((e) => {
        console.log("Error getting info from form", e);
        res.send("movies/create")
      });
})

// display all movies
router.get("/movies", (req, res, next) => {
  Movies.find()
    .then((moviesFromDB) => {
      const data = {
        movies: moviesFromDB,
      };
      res.render("movies/movies", data);
    })
    .catch((e) => {
      console.log("Error getting list of books from DB", e);
      next(e);
    });
});

module.exports = router;