const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');



//READ

router.get("/movies", (req, res, next) => {

    Movie.find()
    

    .then((moviesArr) => {
        console.log( { movies: moviesArr });

            res.render("movies/movies", { movies: moviesArr })
        })
        .catch(err => {
            console.log("error reading movies from DB", err)
            next(err);
        });


});










// CREATE: GET
router.get('/movies/new', (req, res, next) => {

    Movie.find()
   
        .then((moviesArr) => {
            res.render("movies/new-movie", { movies: moviesArr });
        })
        .catch(err => {
            console.log("error getting movies from DB", err)
            next(err);
        });




})




// CREATE: process form

router.post('/movies/new', (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(newMovie)
        .then((movieFromDB) => {
            res.redirect('/movies/new')
        })
        .catch(err => {
            console.log("error adding new movie on DB", err)
            next(err);
        });

});


// MOVIES Details 

router.get('/movies/:movieId', (req, res, next ) => {
    const id = req.params.movieId;
  
    Movie.findById(id)
      .populate("cast")
      .then(moviesArr => {
        console.log(moviesArr)
        res.render('movies/movie-details', {foundMovie: moviesArr})
      })
      .catch(error => {
        console.log(`Error finding movies:`, error);
      })
  });
  

// DELETE

router.post('/movies/:movieId/delete', (req, res, next) => {
    const id = req.params.movieId
  
    Movie.findByIdAndDelete(id) 
      .then(() => {
        console.log('Movie removed successfully')
        res.redirect('/movies');
      })
      .catch(err => {
        console.log('Error deleting movie', err)
      })
  });
  






module.exports = router;
