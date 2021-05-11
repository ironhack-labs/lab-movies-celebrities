const express = require("express");
const CelebrityModel = require("../models/celebrity.model");
const router = new express.Router();
const MovieModel = require("./../models/movie.model");

router.get("/", (req, res, next) => {
  console.log(">>> movies");
  MovieModel.find()
    .then((dbResult) => {
      res.render("movies/movies", { movies: dbResult });
    })
    .catch((dbErr) => next(dbErr));
});

router.get("/movie-details/:id", (req, res, next) => {
  MovieModel.findById(req.params.id)
    .then((dbResult) => {
      res.render(
        "movies/movie-details",
        { movie: dbResult },
        console.log(dbResult)
      );
    })
    .catch((dbErr) => next(dbErr));
});

// ============= CREATE MOVIE ===============

router.get("/new", async (req, res, next) => {
  const celebrities = await CelebrityModel.find();
  res.render("movies/new-movie", { celebrities });
});

router.post("/new", (req, res, next) => {
  console.log(req.body);
  MovieModel.create(req.body)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

// ===================== CREATE MOVIE =================

// ==================== DELETE MOVIE ===============

router.get("/delete-movie/:id", (req, res, next) => {
  MovieModel.findByIdAndDelete(req.params.id)
    .then((dbSuccess) => {
      res.redirect("/movies");
    })
    .catch((dbErr) => {
      next(dbErr);
    });
});

// =============== DELETE MOVIE ==========================

// ================= UPDATE MOVIE =======================

router.get("/edit/:id", async (req, res, next) => {
  const celebrities = await CelebrityModel.find();
  MovieModel.findById(req.params.id).then((dbResult) => {
    res.render("movies/edit-movie", {movie : dbResult, celebrities });
  });
});

router.post("/edit/:id", (req, res, next) => {
  console.log(req.body);
  MovieModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect("/movies"))
    .catch((err) => next(err));
});

// ==================== UPDATE MOVIE ===================

module.exports = router;
