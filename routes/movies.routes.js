const router = require("express").Router();

// require the Movies model here
const Movie = require('../models/Movie.model');

/* Iteration #6: Adding New Movies */
router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie.hbs');
  });
  
  router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie
      .create({ title, genre, plot, cast })
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
  }); 


/* Iteration #7: Listing Our Movies */
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .then((moviesDB) => {
          console.log('Retrieved movies from DB:', moviesDB);
          res.render('movies/movies.hbs', {movies: moviesDB});
        })
        .catch(error => {
          console.log('Error while getting the drones from the DB: ', error);
          next(error);
        });
    });




module.exports = router;
