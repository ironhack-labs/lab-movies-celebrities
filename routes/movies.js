// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movies = require("../models/Movie.model");
const Celebrities = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
    Movies.find()
      //.populate("author")
      .then( moviesFromDB => {
        res.render("movies/movies-list", {movies: moviesFromDB});
      })
      .catch(err => {
        console.log('Error getting movies from DB...', err);
      })
  });
  
  
  router.get("/create", (req, res, next) => {
    Celebrities.find()
      .then(celebrities => {
        res.render("movies/movie-new", {celebritiesArr: celebrities});
      })
      .catch(err => {
        console.log('Error getting authors from DB...', err);
      })
  });
    
  router.post('/create', (req, res, next) => {
  
    const movieDetails = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    }
  
    Movies.create(movieDetails)
      .then( movie => {
        res.redirect("/movies");
      })
      .catch( err => {
        console.log('Error creating new movie...', err);
        res.redirect("movies/movie-new");
      })
  })
  
  
  router.get("/:movieId", (req, res, next) => {
    Movies.findById(req.params.movieId)
      //.populate("author")
      .then( movie => {
        res.render("movies/movie-details", movie);
      })
      .catch();
  });
  
  
  router.get("/:movieId/edit", (req, res, next) => {
    Movies.findById(req.params.movieId)
      .then( (movieDetails) => {
        res.render("movies/movie-edit", movieDetails);
      })
      .catch( err => {
        console.log("Error getting movie details from DB...", err);
      });
  });
  
  router.post("/:movieId/edit", (req, res, next) => {
    const movieId = req.params.movieId;
  
    const newDetails = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      rating: req.body.rating,
    }
  
    Movies.findByIdAndUpdate(movieId, newDetails)
      .then( () => {
        res.redirect(`/movies/${movieId}`);
      })
      .catch( err => {
        console.log("Error updating movie...", err);
      });
  });
  
  
  router.get("/:movieId/delete", (req, res, next) => {
    Movies.findByIdAndDelete(req.params.movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch(err => {
        console.log("Error deleting movie...", err);
      });
  
  });
  

module.exports = router;