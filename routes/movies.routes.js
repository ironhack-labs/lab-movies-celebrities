const router = require("express").Router();

// require the Movies model here
const Movie = require('../models/Movie.model');

/* Iteration #3: Adding New Celebrities */
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




module.exports = router;
