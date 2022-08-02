const router = require("express").Router();
const Movies = require('./models/movies.model')
const Celebrities = require('./models/celebrities.model')
// all your routes here
router.get('/movies/create', (req, res, next) => {
    Celebrities.find()
    .then((allCelebrities) => res.render('movies/new-movies', { celebrities: allCelebrities }))
  
    res.render('movies/new-movie');
  });



  router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
  
    Movies.create({ title, genre, plot, cast })
      .then((createdMovies) => {
        console.log(`Created new movie ${createdMovies.title}`);
        res.redirect('/movies/create');
      })
      .catch((err) => next(err));
  });


  router.get('/Movies', (req, res, next) => {
    Movies.find()
      .then((allMovies) => res.render('Movies/Movies', { Movies: allMovies }))
      .catch((err) => {
        console.log('Error while creating the Movie');
        next(err);
      });
  });
module.exports = router;