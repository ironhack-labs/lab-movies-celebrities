const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');
const { Movie } = require('../models/Movie.model');

// all your routes here
router.get('/movies', (req, res, next) => {
  Movie.find().then((data) => {
    res.render('movies/movies', { movie: data });
  });
});

router.get('/movies/create', async (req, res, next) => {
  Celebrity.find({}, 'name _id').then((data) => {
    console.log(data);
    res.render('movies/new-movie', { celebrities: data });
  });
});

router.post('/movies/create', (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect('/movies');
      console.log('Movie created!!!');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/movies/create');
    });
});

module.exports = router;
