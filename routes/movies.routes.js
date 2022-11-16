// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Movie = require("../models/Movie.model.js");
const Celeb = require("../models/Celebrity.model");
module.exports = router;
//GET router
router.get("/movies/create", (req, res, next) => {
  Celeb.find().then((celebfromDb) => {
    res.render("movies/new-movie.hbs", { celeb: celebfromDb });
  });
});

//POST
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((moviefromDb) => res.redirect("/movies/"))
    .catch((error) => next(error));
});

//iteration 7
router.get("/movies/", (req, res, next) => {
  Movie.find()
    .then((moviefromDb) =>
      res.render("movies/movies.hbs", { movie: moviefromDb })
    )
    .catch((error) => next(error));
});

//iteration 8
router.get("/movies/:movieId", (req, res) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("cast")
    .then((theMovie) =>
      res.render("movies/movie-details.hbs", { movie: theMovie })
    )
    .catch((error) => {
      console.log("Error while retrieving movie details: ", error);
    });
});

//iteration 9
router.post("/movies/:movieId/delete", (req, res) => {
  const { movieId } = req.params;
  Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      console.log("Error while retrieving movie: ", error);
    });
});

//iteration 10
router.get("/movies/:movieId/edit", (req, res) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((theMovie) => {
      Celeb.find().then((celebsFromDB) =>
        res.render("movies/edit-movie.hbs", {
          movie: theMovie,
          celeb: celebsFromDB,
        })
      );
    })
    .catch((error) => {
      console.log("Error while retrieving movie details: ", error);
    });
});

router.post("/movies/:movieId", (req, res) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => {
      updatedMovie.save();
    })
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      console.log("Error while getting movie from the DB: ", error);
    });
});
