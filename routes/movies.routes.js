const express = require("express");
const router = express();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((result) => {
      res.render("movies/new-movie", { celebrities: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/", (req, res) => {
  Movie.find()
    .then((dataFromDataBase) => {
      console.log(dataFromDataBase);
      res.render("movies/movies.hbs", { movies: dataFromDataBase });
    })
    .catch(() => {
      console.log("error occured while fetcing movies !");
    });
});

router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      console.log(`foundMovie`, foundMovie);

      res.render("movies/movie-details", { foundMovie });
    });
});

router.post("/:movieId/delete", (req, res) => {
  console.log(req.params.movieId);

  Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/movies");
      // res.status(200).json({ message: "Movie deleted!" });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Iteration 10
router.get("/:id/edit", (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      Celebrity.find()
        .then((celebrities) => {
          res.render("movies/movie-edit", { movie, celebrities });
        })
        .catch((celebritiesError) => {
          console.error(celebritiesError);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((movieError) => {
      console.error(movieError);
      res.status(500).send("Internal Server Error");
    });
});

router.post("/:id/edit", (req, res) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .populate("cast")
    .then(() => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch((updateError) => {
      console.error(updateError);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
