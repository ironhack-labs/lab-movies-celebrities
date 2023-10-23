// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Movie = require('../models/Movie.model.js');
const Celebrity = require('../models/Celebrity.model.js');

// all your routes here
// ('/movies/create é o que aparece na barra para colocar o site no browser)
// No res.render são as handlebars que vamos aceder

//Display the page of Create a new movie
router.get('/movies/create', async (req, res) => {
  try {
    let celebritiesFromDB = await Celebrity.find();
    res.render('movies/new-movie.hbs', {
      celebrities: celebritiesFromDB,
    });
  } catch (error) {
    console.log(error);
  }
});

//Create a new movie
router.post('/movies/create/', async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect(`/movies`); // we redirect to routes
  } catch (error) {
    console.log(error);
  }
});

//Display all movies
router.get('/movies', async (req, res) => {
  try {
    let moviesFromDB = await Movie.find();
    res.render('movies/movies.hbs', {
      movies: moviesFromDB,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// ITERATION 8 - Display the movie details
router.get('/movies/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    let foundMovie = await Movie.findById(movieId).populate('cast');
    res.render('movies/movie-details.hbs', foundMovie);
  } catch (error) {
    console.log(error);
  }
});

// ITERATION 9 - delete a specific movie
router.post('/movies/:movieId/delete', async (req, res) => {
  const { movieId } = req.params;
  try {
    const removedMovie = await Movie.findByIdAndRemove(movieId);
    res.redirect('/movies');
  } catch (error) {
    console.log(error);
  }
});

// ITERATION 10

// GET Route to display the form to update a specific Movie
router.get('/movies/:movieId/edit', async (req, res) => {
  try {
    const { movieId } = req.params;
    let foundMovie = await Movie.findById(movieId);
    let celebrities = await Celebrity.find();
    res.render('movies/edit-movie.hbs', { movie: foundMovie, celebrities });
  } catch (error) {
    console.log(error);
  }
});

// POST Route to actually make updates on a specific Movie
router.post('/movies/:movieId/edit', async (req, res) => {
  try {
    // destructure the req.params object to get movieId
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;

    // update the same document with new content
    await Movie.findByIdAndUpdate(
      movieId,
      { title, genre, plot, cast },
      { new: true }
    );

    // redirect to movies list page
    res.redirect('/movies');
  } catch (error) {
    console.log(error);
  }
});
