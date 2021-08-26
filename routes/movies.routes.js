const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// GET to get all the movies listed
router.get('/', (req, res, next) => {
  Movie.find()
    .then((allMoviesFromDB) => {
      res.render('movies/movies', { movies: allMoviesFromDB });
    })
    .catch((err) => {
      console.log('Movies were not retrieved from the DB', err);
      next(err);
    });
});

router.get('/create', (req, res, next) => {
  Celebrity.find()
    .then((foundCelebrities) => {
      res.render('movies/new-movie', { celebrities: foundCelebrities });
    })
    .catch((err) => {
      console.log(`Error appeared while getting the info from the DB: ${err}`);
      res.redirect('/movies/create');
    });
});

// POST to create a new movie and corresponidng CAST
router.post('/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(
        `Error appeared on the way to create the post of movie: ${err}`
      );
      next(err);
    });
});

// GET to get the movie by its ID and populate with CAST
router.get('/:movieId', (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('cast')
    .then((movieFromDB) => {
      res.render('movies/movie-details', movieFromDB);
    })
    .catch((err) => {
      console.log(`Movie was not found or smth went wrong: ${err}`);
      next(err);
    });
});

//POST to remove/delete the movie by its ID
router.post('/:movieId/delete', (req, res, next) => {
  const movieId = req.params.movieId;
  console.log('IDDD ' + movieId);
  Movie.findByIdAndRemove(movieId)
    .then((removedMovie) => {
      console.log(removedMovie);
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(`Sometning went wrong during deleting th emovie: ${err}`);
      next(err);
    });
});

// GET to edit the movie by its ID
router.get('/:movieId/edit', (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .then((movieFromDB) => {
      let castId = movieFromDB.cast;
      Celebrity.findById(castId).then((castFromDB) => {
        Celebrity.find().then((allCelebs) => {
          res.render('movies/edit-movie', {
            movie: movieFromDB,
            cast: castFromDB,
            celebrities: allCelebs,
          });
        });
      });
    })
    .catch((err) => {
      console.log(
        `Something went wrong during getting the info from DB: ${err}`
      );
      next(err);
    });
});

// POST to update the movie and its cast by movie ID
router.post('/:movieId', (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(
    movieId,
    {
      title,
      genre,
      plot,
      cast,
    },
    { new: true }
  )
    .then((updatedMovie) => {
      console.log(updatedMovie);
      res.redirect(`/movies/${movieId}`);
    })
    .catch((err) => {
      console.log(`Smth went wrong during posting the movie: ${err}`);
      next(err);
    });
});

module.exports = router;
