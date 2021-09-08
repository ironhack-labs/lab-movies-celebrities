const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((dbCelebrity) => {
      res.render("movies/new-movie", { dbCelebrity });
    })
    .catch((err) =>
      console.log(`Err while displaying post input page: ${err}`)
    );
});

router.post("/movies/create", (req, res, next) => {
  // console.log(req.body);
  const { title, genre, cast, plot } = req.body;

  Movie.create({ title, genre, cast, plot })

    .then(
      (movieFromDB) => console.log(`New movies created: ${movieFromDB.name}.`),
      res.redirect("/movies")
    )
    .catch((error) => next(error), res.redirect("/movies/new-movie"));
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((dbMovie) => {
      res.render("movies/movies.hbs", { dbMovie });
    })
    .catch((err) =>
      console.log(`Err while displaying post input page: ${err}`)
    );
});

router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate("cast")
    .then((dbMovieOne) => {
      res.render("movies/movie-details", { dbMovieOne });
      console.log(dbMovieOne);
    })
    .catch((err) =>
      console.log(`Err while displaying post input page: ${err}`)
    );
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then((dbMovieToDelete) => {
      res.redirect("/movies");
      console.log(dbMovieOne);
    })
    .catch((err) =>
      console.log(`Err while displaying post input page: ${err}`)
    );
});

module.exports = router;
