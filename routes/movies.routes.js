const express = require("express");
const router = express.Router();

//Requerimos movie model
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


// ruta para renderizar las movies creadas
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

// ruta donde creamos las movies GET
router.get("/create", (req, res, next) => {
  res.render("movies/new-movie", {});
});


// ruta donde creamos las movies POST
router.post("/create", (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
     // console.log(movie);
      res.redirect("/movies");
    })
    .catch((err) => {
        //si nos da error volvemos a new movie
      res.render("movies/new-movie");
    });
});

router.get("/new-movie", (req, res, next) => {
  res.render("movies/new-movie");
});

module.exports = router;