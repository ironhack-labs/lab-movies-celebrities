// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require ('../models/Movie.model')

// all your routes here

//Iteration 6: add new movies / Create

// GET route to display the form

router.get('/movies/create', (req, res) => res.render('movies/new-movie.hbs'));

// POST route to save a new celebrity to the database in the celebrities collection

router.post('/movies/create', (req, res, next) => {
    // console.log(req.body);
    const { title, genre, plot, cast } = req.body;
   
    Movie.create({ title, genre, plot, cast })
      // .then(movieFromDB => console.log(`New movie created: ${movieFromDB.title}.`))
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
  });


//Iteration #7: Listing movies / Read

// GET route to retrieve and display all the movies

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((allMoviesFromDB) => {
        // console.log(allMoviesFromDB)
        res.render('movies/movies.hbs', {movies : allMoviesFromDB})
      })
    .catch(err=>next(err))
})

// Iteration #8: The Movie Details Page

// GET route to retrieve and display details of a specific movie

router.get('/movies/:movieId', (req, res, next) => {
    const { movieId } = req.params;
   
    Movie.findById(movieId)
      .then(theMovie => res.render('movies/movie-details.hbs', { movie : theMovie }))
      .catch(error => next(error));
});


// Iteration #9: Deleting Movies

// POST route to delete a movie from the database

router.post('/movies/:movieId/delete', (req, res, next) => {
    const { movieId } = req.params;
   
   Movie.findByIdAndRemove(movieId)
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
  });

module.exports = router;