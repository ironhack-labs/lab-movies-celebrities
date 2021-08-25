const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/', (req, res, next) => {
  Movie.find()
    .then((allMoviesFromDB) => {
      // console.log(JSON.stringify(allMoviesFromDB, null, '\t'));
      res.render('movies/movies', { movies: allMoviesFromDB });
    })
    .catch((err) => {
      console.log('Movies were not retrieved from the DB', err);
    });
});

router.get('/create', (req, res, next) => {
  Celebrity.find()
    .then((foundCelebrities) => {
      res.render('movies/new-movie', { celebrities: foundCelebrities });
    })
    .catch((err) => {
      console.log(`Error appeared while getting the info from the DB: ${err}`);
    });
});

// POST to create a new movie and corresponidng CAST
router.post('/create', (req, res, next) => {
  const newMovie = req.body;
  const { title, genre, plot, cast } = req.body;
  console.log(`Title: ${title}\nGenre: ${genre}\nPlot: ${plot}\nCast: ${cast}`);
  Movie.create({ title, genre, plot, cast }).then(() => {
    res.redirect('/movies');
  });
});

// GET to get the movie by its ID and popukate with CAST
router.get('/:movieId', (req, res, next) => {
  console.log('Movie id', req.params.movieId);
  Movie.findById(req.params.movieId)
    .populate('cast')
    .then((movieFromDB) => {
      console.log(JSON.stringify(movieFromDB, null, '\t'));
      res.render('movies/movie-details', movieFromDB);
    })
    .catch((err) => {
      console.log(`Movie was not found or smth went wrong: ${err}`);
    });
});

router.post('/:movieId/delete', (req, res) => {
  const movieId = req.params.movieId;
  console.log('IDDD ' + movieId);
  Movie.findByIdAndRemove(movieId).then((removedMovie) => {
    console.log(removedMovie);
    res.redirect('/movies');
  });
});

router.get('/:movieId/edit', (req, res) => {
  const movieId = req.params.movieId;
  // Movie.findByIdAndUpdate(movieId, {}).then()
  Movie.findById(movieId).then((movieFromDB) => {
    Celebrity.findById(movieFromDB.cast).then((castFromDB) => {
      Celebrity.find().then((allCelebs) => {
        console.log('Movie From DB: ' + movieFromDB);
        console.log('Cast from DB: ' + castFromDB);
        console.log('Celebs from DB: ' + allCelebs);
        res.render('movies/edit-movie', {
          movie: movieFromDB,
          cast: castFromDB,
          celebrities: allCelebs,
        });
      });
    });
  });
});

router.post('/:movieId', (req, res) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(movieId, {
    title,
    genre,
    plot,
    cast,
  }).then((updatedMovie) => {
    console.log(updatedMovie);
    res.redirect(`/movies/${movieId}`);
  });
});

module.exports = router;
