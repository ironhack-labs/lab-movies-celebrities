const app = require('../app');

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
// all your routes here

router.get('/', async (req, res, next) => {
  console.log('GETTING MOVIES');
  try {
    movies = await Movie.find().populate('celebrity');
    // console.log(celeb)
    res.render('movies/movies', { movies });
  } catch (err) {
    next(err);
  }
});

router.get('/create/:id?', async (req, res, next) => {
  console.log('Creating Movie');
  try {
    const formData = {
      title: 'Add New Movie',
      action: '/movies/create',
      btnSubmit: 'Add Movie',
    };
    let movie = {};
    let celebs = [];

    celebs = await Celebrity.find();

    if (req.params.id) {
      movie = await Movie.findById(req.params.id);
      celebs.forEach((celeb) => {
        if (celeb._id.equals(movie.celebrity)) celeb.selected = true;
      });
      formData.title = 'Edit Movie';
      formData.action = `/movies/update/${movie._id}`;
      formData.btnSubmit = 'Save Changes';
    }

    res.render('movies/new-movie', { movie, celebs, formData });
  } catch (err) {
    console.log({ caquense: err });
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('celebrity');
    // console.log(celeb)
    res.render('movies/movie-details', { movie });
  } catch (err) {
    next(err);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    const data = await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/movies');
  } catch (err) {
    next(err);
  }
});

router.post('/create', async (req, res, next) => {
  console.log('Saving Movie to Database');
  try {
    const data = await Movie.create(req.body);
    if (data) res.redirect('/movies');
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const data = await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/movies');
  } catch (err) {
    next(err);
  }
});
module.exports = router;
