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



router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((foundMovie) => {
      Celebrity.find()
      .then(allCelebritiesFromDB => {
          allCelebritiesFromDB.forEach(oneCeleb => {
              foundMovie.cast.forEach(castMember => {
                  if(castMember.equals(oneCeleb._id)) {
                      oneCeleb.isInCast = true
                  }
              }) 
           });
          res.render("movies-views/edit-movie", {foundMovie, allCelebritiesFromDB})
      })
    })
      .catch((err) => console.log(`Error while getting the movie from DB for editing: ${err}
    })`))
});



router.post("/movies/:id", (req, res, next) => {
  const {title, genre, plot, cast} = req.body

 Movie.findByIdAndUpdate(req.params.id,  {title, genre, plot, cast} , { new: true })
    .then((updatedMovie) => {
      console.log("updated:", updatedMovie);
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch((err) => console.log(`Error while saving  updates to a movie: ${err}`));
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