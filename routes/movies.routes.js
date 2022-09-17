const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');
const { Movie } = require('../models/Movie.model');

// all your routes here

// Iteration 6
// Show movies form
router.get('/movies/create', (req, res, next) => {
  Celebrity.find({}, 'name _id')
    .then((data) => {
      res.render('movies/new-movie', { celebrities: data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/movies/create');
    });
});

router.post('/movies/create', (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/movies/create');
    });
});

// Iteration 7
// Listing all movies
router.get('/movies', (req, res, next) => {
  Movie.find({}, 'title').then((data) => {
    res.render('movies/movies', { movies: data });
  });
});

// Iteration 8
// Movies detail page
router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then((data) => {
      res.render('movies/movie-detail', { movies: data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/movies/create');
    });
});

// Iteration 9
// Delete movies
router.post('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(err);
      // res.redirect('/movies');
    });
});

// Iteration 10
// Edit movies
router.get('/movies/:id/edit', async (req, res, next) => {
  const movieData = await Movie.findById(req.params.id).populate('cast', '_id name'); // <option value="second" selected>Second Value</option>
  const celebrityData = await Celebrity.find({}, '_id name');

  // This was painful ;D
  // https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array/34901916#34901916
  const filteredArray = celebrityData.filter((celebrityData_el) => {
    return (
      movieData.cast.filter((movieData_el) => {
        return movieData_el.name == celebrityData_el.name;
      }).length == 0
    );
  });

  res.render('movies/edit-movie', { movie: movieData, celebrities: filteredArray });
});

router.post('/movies/:id', (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(err);
      // res.redirect('/movies');
    });
});

module.exports = router;
