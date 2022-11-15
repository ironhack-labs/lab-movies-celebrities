// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrities = require('../models/Celebrity.model');
const Movies = require("../models/Movies.model");

// all your routes here
router.get('/movies', (req, res, next) => {
  return Movies.find()
    .then((allTheMoviesFromDB) => {
      res.render("movies/new-movie.hbs", { movies: allTheBooksFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);
      next(error);
    });
  });

router.get("/movies/new-movie", (req, res) => { 
  Celebrities.find()
  .then((allTheCelebritiesFromDB) => {
    res.render("movies/new-movie", {celebrities : allTheCelebritiesFromDB})
  })    
});

router.post("/movies/create", (req, res, next) => { 
  const {title, genre, plot, cast} = req.body;

  Movies.create({title, genre, plot, cast})
  .then(() => {res.redirect("movies/movies")})
  .catch((error) => {next(error)})
});

module.exports = router;