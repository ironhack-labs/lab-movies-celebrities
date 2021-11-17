const router = require('express').Router();
const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model');

// GET - Show form to create a movie
router.get('/movies/create', (req, res) => {
  Celebrity.find()
    .then((celebritiesList) => {
      res.render('movies/new-movie', { celebritiesList });
    })
    .catch((err) =>
      console.log(
        'Error while displaying a form to create a new a movie: ',
        err
      )
    );
});

//POST - Send and save data from form to database
router.post('/movies/create', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.body);

  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      res.redirect('/');
    })
    .catch((err) => console.log('Error while creating a movie: ', err));
});

// Show all Movies
router.get('/movies', (req, res) => {
  Movie.find()
    .populate('cast')
    .then((moviesList) => {
      res.render('movies/all-movies', { moviesList });
    })
    .catch((err) => console.log('Error while displaying all movies: ', err));
});

// GET Movies Details
router.get('/movies/:id', (req, res) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then((theMovie) => {
      res.render('movies/movie-details', { theMovie });
    })
    .catch((err) => console.log('Error while displaying movie details: ', err));
});
// Delete Movies
router.post('/movies/:id/delete', (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => console.log('Error while deleting a movie: ', err));
});

// Get Edit Movies Form
router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
  .then(foundMovie => {
    Celebrity.find()
    .then(allCelebs => {
      allCelebs.forEach(oneCeleb => {
        foundMovie.cast.forEach(oneCastMember => {
          // console.log("what is this: ", oneCastMember);
          if(oneCeleb._id.equals(oneCastMember)){
            oneCeleb.isInCast = true;
          }
        })
      })
      res.render('movies/edit-movie', { movie: foundMovie, allCelebs })
    })
  })
  .catch( err => console.log("Error while getting the movie for the edit form: ", err))
})

// Update Movies
router.post('/movies/:id/update', (req, res) => {
  // we can use 'req.body' since we used the same names as in our MOVIE model
  Movie.findByIdAndUpdate(req.params.id, req.body)
  .then( updatedMovie => {
    // if everything is fine, take me back to the details page so we can see the changes we made
    res.redirect(`/movies/${req.params.id}`);
  } )
  .catch( err => console.log("Error while getting updating the movie: ", err))
})


module.exports = router;
