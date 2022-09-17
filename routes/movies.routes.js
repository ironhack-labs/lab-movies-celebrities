const router = require('express').Router();
const { Celebrity } = require('../models/Celebrity.model');
const { Movie } = require('../models/Movie.model');

// all your routes here

// Iteration 6
// Show movies form
router.get('/movies/create', async (req, res) => {
  const celebrityData = await Celebrity.find({}, 'name _id');
  try {
    res.render('movies/new-movie', { celebrities: celebrityData });
  } catch (err) {
    console.log(err);
    res.redirect('/movies/create');
  }
});

router.post('/movies/create', async (req, res) => {
  await Movie.create(req.body);
  try {
    res.redirect('/movies');
  } catch (err) {
    console.log(err);
    res.redirect('/movies/create');
  }
});

// Iteration 7
// Listing all movies
router.get('/movies', async (req, res) => {
  const movieData = await Movie.find({}, 'title');
  try {
    res.render('movies/movies', { movies: movieData });
  } catch (err) {
    console.log(err);
    res.redirect('/movies/create');
  }
});

// Iteration 8
// Movies detail page
router.get('/movies/:id', async (req, res) => {
  const movieData = await Movie.findById(req.params.id).populate('cast');
  try {
    res.render('movies/movie-detail', { movies: movieData });
  } catch (err) {
    console.log(err);
  }
});

// Iteration 9
// Delete movies
router.post('/movies/:id/delete', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  try {
    res.redirect('/movies');
  } catch (err) {
    console.log(err);
    res.redirect('/movies');
  }
});

// Iteration 10
// Edit movies
router.get('/movies/:id/edit', async (req, res) => {
  try {
    const movieData = await Movie.findById(req.params.id).populate('cast', '_id name');
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
  } catch (error) {
    console.log(err);
  }
});

router.post('/movies/:id', async (req, res) => {
  await Movie.findByIdAndUpdate(req.params.id, req.body);
  try {
    res.redirect('/movies');
  } catch (err) {
    console.log(err);
    res.redirect('/movies');
  }
});

module.exports = router;
