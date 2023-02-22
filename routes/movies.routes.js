// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/movies.hbs', { movies: movies });
    })
    .catch((error) => {
      console.log(error);
      res.render('error.hbs');
    });
});

router.get('/movies/create', (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    res.render('movies/new-movie.hbs', { celebrities: celebrities });
  });
});

router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id).then((movie) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render('movies/edit-movie.hbs', { movie, celebrities });
      })
      .catch((error) => console.error(error));
  });
});

router.post('/movies/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => {
      console.log(updatedMovie);
      console.log(`Movie ${updatedMovie.title} updated.`);
      res.redirect('/movies');
    })
    .catch((error) => console.error(error));
});

router.post('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
      res.redirect('/movies');
    })
    .catch((error) => console.error(error));
});

router.post('/movies/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect('/movies'))
    .catch((error) => {
      console.error(error);
      res.render('movies/new-movie.hbs');
    });
});

router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then((movie) => {
      res.render('movies/movie-details.hbs', movie);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
