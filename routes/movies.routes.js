const express = require("express");
const CelebrityModel = require("../models/celebrity.model");
const router = new express.Router();
const MovieModel = require("../models/movie.model");

//new-movie
router.get("/new", (req, res, next) => {
    CelebrityModel.find()
  .then(result=> res.render("movies/new-movie", {celebs : result}))
  .catch(next)
});

router.post("/create", (req, res, next) => {
  MovieModel.create(req.body)
    .then(() => res.redirect("/movies"))
    .catch(next);
});

//movies
router.get("/", (req, res, next) => {
  MovieModel.find({})
    .then((result) => res.render("movies/movies", { movies: result }))
    .catch(next);
});

//edit-movie
router.get("/edit-movie/:id", (req, res, next) => {
  MovieModel.findById(req.params.id)
    .populate("cast")

    .then((result) => {
      CelebrityModel.find({})
      .then((result2) =>
        res.render("movies/edit-movie", {
          celebrities: result,
          movieId: result2,
        })
      );
    })
    .catch(next);
});

router.post("/edit-movie/:id", (req, res, next) => {
  MovieModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect("/movies"))
    .catch(next);
});

//delete movies
router.get("/delete/:id", (req, res, next) => {
  MovieModel.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch(next);
});

//details
router.get("/movie-details/:id", (req, res, next) => {
  MovieModel.findById(req.params.id)
    .populate("cast")
    // CelebrityModel.findById(req.params.id)
    .then((movie) => res.render("movies/movie-details", { movieDetail: movie }))
    .catch(next);
});

module.exports = router;
