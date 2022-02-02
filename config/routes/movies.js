const express = require('express');
const router  = express.Router();
const Celebrity = require('../../models/celebrity.model')
const Movie =  require('../../models/movie.model')

/* GET home page */

router.get('/', (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then(movies => {
      res.render('movies/movies', { movies });
    })
    .catch(err => console.error(err))
});

router.get('/new', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('movies/new-movie', { celebrities });
    })
    .catch(err => console.error(err))
});

router.post('/create', (req, res, next) => {
  const movie = req.body;

  Movie.create(movie)
    .then(movie => {
      console.log('Movie created ->', movie)
      res.redirect("/")
    })
    .catch(err => console.error(err))
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id

  Movie.findById(id)
    .populate('cast')
    .then((movie) => {
      res.render('movies/movie-details', { movie })
    })
    .catch((err) => {
      console.error(err)
    })
})

module.exports = router;