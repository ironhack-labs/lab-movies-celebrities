const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');
const { Movie } = require('../models/Movie.model');

// all your routes here
router.get('/movies', (req, res, next) => {
  Movie.find({}, 'title').then((data) => {
    // console.log(data);
    res.render('movies/movies', { movies: data });
  });
});

router.get('/movies/create', (req, res, next) => {
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

router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then((data) => {
      console.log(data);
      res.render('movies/movie-detail', { movies: data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/movies/create');
    });
});

module.exports = router;

// router.get('/movies', (req, res, next) => {
//   Movie.find()
//     .populate('cast')
//     .then((data) => {
//       console.log(data);
//       res.render('movies/movies', { movies: data });
//     });
// });
