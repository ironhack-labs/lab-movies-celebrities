// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model.js'); // <== add this line before your routes
 
// GET route to retrieve and display all the books
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(allTheMoviesFromDB => { 
      res.render('movies/movies.hbs', { movies: allTheMoviesFromDB});
    })
    .catch(error => {
      console.log('Error while getting the movies from the DB: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get('/movies/create', (req, res) => res.render('movies/new-movie.hbs'));


router.post('/movies/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
  .then(movieFromDB => {
    // -> allTheBooksFromDB is a placeholder, it can be any word
    console.log(`New Movie created: ${movieFromDB.title}.`);
    res.redirect('/movies');
  })
  .catch(error => {
    console.log('Error while getting the books from the DB: ', error);

    // Call the error-middleware to display the error page to the user
    next(error);
  });
});

router.get('/movies/:id', (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
  .then(movieFromDB => {
    // -> allTheBooksFromDB is a placeholder, it can be any word
    console.log(`Movie from DB: ${movieFromDB.title}.`);
    res.render('movies/movie-details', {movie: movieFromDB});
  })
  .catch(error => {
    console.log('Error while getting the books from the DB: ', error);

    // Call the error-middleware to display the error page to the user
    next(error);
  });
});

router.post('/movies/:movieId/delete', (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect('/movies'))
    .catch(error => next(error));
});

module.exports = router;