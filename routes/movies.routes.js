// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");

// all movies

router.get("/movies", (req, res, next) => {
  MovieModel.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log("Error when finding movies");
      next(error);
    });
});

router.get("/movies/create", (req, res) => {
  CelebrityModel.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/create", (req, res, next) => {
  const { name, genre, plot, cast } = req.body;
  MovieModel.create({ name, genre, plot, cast })
    .then((createdCelebrity) => {
      console.log(createdCelebrity);
      res.redirect("/movies");
    })
    .catch((err) => res.render("movies/new-movie"));
});

module.exports = router;
