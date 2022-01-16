// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = require("express").Router();
const MovieModel = require("../models/movie.model");
const CelebrityModel = require("../models/Celebrity.model");

// all your routes here

router.post("/movie/create", async function (req, res, next) {
  try {
    await MovieModel.create(req.body);
    res.redirect("/movie");
  } catch (err) {
    next(err);
  }
});

router.get("/movie/create", (req, res, next) => {
  CelebrityModel.find()
    .then((celebrity) => {
      res.render("movies/new-movie", { celebrity });
    })
    .catch((error) => console.log(error));
});

router.get("/movie", (req, res, next) => {
  MovieModel.find()
    .then((movie => {
      res.render("movies/movies", { movie })
    }))
    .catch((error) => console.log(error));
});


router.get("/movies/:id", (req, res, next) =>{
    MovieModel
    .findById(req.params.id)
    .populate("cast")
    .then((movie =>{
        res.render("movies/movie-details", {movie})
    }))
    .catch((error) => console.log(error));
});

router.post("/movies/:id/delete", (req, res, next) =>{
MovieModel
.findOneAndRemove(req.params.id)
.then(() => res.redirect("/movie"))
.catch((error) => console.log(error));
})



module.exports = router;
