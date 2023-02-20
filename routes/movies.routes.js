// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/create', (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render('movies/new-movie', { celebrities });
      })
      .catch((error) => {
        res.render('error', { error });
      });
  });

  router.post('/create', (req, res) => {
    const newMovie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast
    });
  
    newMovie.save()
      .then(() => {
        res.redirect('/movies');
      })
      .catch((error) => {
        res.render('movies/new-movie', { error: error.message });
      });
  });

  // Show all movies
router.get('/', (req, res) => {
    Movie.find()
      .then((movies) => {
        res.render('movies/movies', { movies });
      })
      .catch((error) => {
        res.render('error', { error });
      });
  });

// Show movie by id
router.get('/:id', (req, res) => {
    Movie.findById(req.params.id)
      .populate('cast')
      .then((movie) => {
        res.render('movies/movie-details', { movie });
      })
      .catch((error) => {
        res.render('error', { error });
      });
  });


module.exports = router;