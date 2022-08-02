const router = require("express").Router();

// all your routes here
const Movies = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie');
  });

router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot} = req.body

    Movies.create({title, genre, plot})
    .then((createdMovie) => {
      console.log(`Created the Movie ${createdMovie.title}`);
      res.redirect('/movies');
    })
    .catch((err) => next(err));
});
router.get('/movies', (req, res, next) => {
    Movies.find()
      .then((allMovies) => res.render('movies/movies', {movies: allMovies}))
      .catch((err) => {
        console.log('Error while creating the Movie');
        next(err);
      });
  });





module.exports = router;