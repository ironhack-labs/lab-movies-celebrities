const router = require("express").Router();
const Movie = require("../models/Movie.model");

router.get("/movies", (req, res, next) => {
    Movie.find()
        .then((moviesFromDB) => {
            res.render("movies/movies", { moviesFromDB })
        })
        .catch(err => {

            console.log("error reading movies in DB", err)
            next(err);
        })
})


router.get('/movies/create', (req, res, next) => {
    // console.log(res.body);
     res.render("movies/new-movie");
 })
 
 router.post('/movies/create', (req, res, next) => {
 
     const movieDetails = {
 
         title: req.body.title,
         genre: req.body.genre,
         plot: req.body.plot,
         cast: req.body.cast,
     }
 
     Movie.create(movieDetails)
         .then(() => {
             res.redirect("/movies")
         })
         .catch(err => {
 
             console.log("error creating new author in DB", err)
             next(err);
         })
 })
 
 router.get("/movies/:movieId", (req, res, next) => {
    const id = req.params.movieId;
  
    Movie.findById(id)
      //.populate("author")
      .then( movieDetails => {
        res.render("movies/movie-details", {movies: movieDetails});
      } )
      .catch( err => {
        console.log("error getting movie details from DB", err);
        next();
      })
  });

  router.post("/movies/:movieId/delete", (req, res, next) => {
    Movie.findByIdAndRemove(req.params.movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch(err => {
        console.log("Error deleting movie...", err);
        next();
      });
  
  });
module.exports = router;