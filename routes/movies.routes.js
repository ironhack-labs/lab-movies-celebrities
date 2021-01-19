const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");



router.get("/movies/new", (req, res, next) => {
  Celebrity.find()
  .then((celebrityFromDB) => res.render("movies-views/new-movie", { celebrityFromDB }))
  .catch((err) => console.log(`Error while displaying the form to create a new movie: ${err}`));
     
});


    

router.post('/movies/create', (req, res, next) => {
  
  const {title, genre, plot, cast} = req.body
   
  Movie.create({title, genre, plot, cast})
  
    .then((savedMovie)=> {
      console.log(savedMovie)
      res.redirect("/movies")
    })
    .catch((err) => console.log(`Error while saving a new movies to DB: ${err}`));
});    

 

router.get("/movies", (req, res, next) => {
 Movie.find()
    .then((movieFromDB) => res.render("movies-views/movies", { movieFromDB }))
    
    .catch((err) => console.log(`Error while getting all movies from DB: ${err}`));
});


router.post("/movies/:movieId/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(`Error while deleting a movie from DB: ${err}`));
});




router.get("/movies/:movieId", (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate("cast")
    .then((foundMovie) => {
      console.log(foundMovie);
      res.render("movies-views/movie-details", {foundMovie});
    })
    .catch((err) => console.log(`Error while getting the movie details from DB: ${err}`));
});


module.exports = router;