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
    .then((moviesFromDB) => res.render("movies-views/movies", { moviesFromDB }))
    .catch((err) => console.log(`Error while getting all movies from DB: ${err}`));
});


//last
router.get("/movies/:movieId", (req, res, next) => {
  // console.log("ID: ", req.params.bookId);

  Movie.findById(req.params.movieId)
    .populate("cast")
    .then((foundMovie) => {
      // console.log(foundMovie);
      res.render("movies-views/movie-details.hbs", {foundMovie });
    })
    .catch((err) => console.log(`Error while getting the book details from DB: ${err}`));
});

module.exports = router;