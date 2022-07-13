const Celebrity = require("../models/Celebrity.model");
const { populate } = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get("/movies/create", (req, res) => {

   Celebrity.find()
    .populate("name")
    .then( (celebrityArr) => {
    
    res.render("movies/new-movie", {celebrityArr});
  })
  })
  
  router.post("/movies/create", (req, res) => {
    // console.log(req.body)
    const movieDetails = {
      title: req.body.title,
      celebrity: req.body.celebrity,
      plot: req.body.plot,
      genre: req.body.genre,
    };
    Movie.create(movieDetails)
    .then( () => {
      res.redirect("/movies");
    })
    .catch( (error) => {
      console.log("Error creating celebrity in the DB", error);
      res.render("movies/new-movie");
    })
  })

  router.get("/movies", (req, res) => {

    Movie.find()
    .then( (moviesArr) => {
    
    res.render("movies/movies", {moviesArr});
  })
  })


  router.get("/movies/:movieId", (req, res) => {
    const movieId = req.params.movieId;

    Movie.findById(movieId)
    .populate("cast")
    .then( (movieDetails) => {
    res.render("movies/movie-details", {movieDetails});
  })
  })
  

  router.post("/movies/:movieId/delete", (req, res) => {

    const {movieId} = req.params;
      Movie.findByIdAndRemove(movieId)
      .then( () => {
        res.redirect("/movies")
      })
      .catch( (error) => {
        console.log("Error deleting movie from DB", error);
        next(error);
      })
  })

module.exports = router;