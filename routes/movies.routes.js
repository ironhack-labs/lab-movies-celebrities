const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();


router.get('/movies', (req, res, next) =>{
  Movie.find()
    .then(movies => {
      res.render('movies/movies', { movies })
    })
})

router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      res.render('movies/movie-details', {movie})
    })
    .catch(err => console.log(err))
})

// all your routes here
router.get('/movie/create', (req, res, next) => {
  console.log('SEND ME TO NEW MOVIE HBS FILE')
  const celebrities = Celebrity.find().then(celebs => {
    res.render('movies/new-movie', { celebs })
  }).catch(err => console.log(err))
})

router.post('/movie/create', (req, res, next) => {
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
  })
  .then(createdMovie => {
    res.redirect('/movies')
  })
})

module.exports = router;