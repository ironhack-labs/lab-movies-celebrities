// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
// all your routes here

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celeb) => {
      res.render("movies/new-movie", { celeb });
    })
    .catch((err) => res.send(err));
});

router.post("/movies/create", (req, res) => {
  Movie.create(req.body)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => res.render("movies/new-movie"));
});

router.get("/movies", (req, res) => {
  Movie.find().then((movie) => {
    res.render("movies/movies", { movie });
  });
});

router.get("/movies/:id", (req, res) =>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then((movie)=>{
    res.render("movies/movie-details", {movie})
    })
    .catch((err) => res.send(err));
})


module.exports = router;
