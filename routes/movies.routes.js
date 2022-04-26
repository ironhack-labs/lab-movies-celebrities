const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


//movie list
router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((moviesArr) => res.render("movies/movies", { movies: moviesArr }))
    .catch(err => {
      console.log(err)
      next(err);
    });
});



//create movies
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebsArr) =>res.render("movies/new-movie", { celebrities: celebsArr }))
    .catch(err => {
      console.log(err)
      next(err);
    });

});


//create movies process
router.post("/movies/create", (req, res, next) => {

  const newMovies = {
    title: req.body.title,
    genre: req.body.genre,
    cast: req.body.cast,
    plot: req.body.plot
  }

  Movie.create(newMovies)
    .then(() => res.redirect("/movies"))
    .catch(err => {
      console.log(err)
      next(err);
    });
});


//create movie Details
router.get("/movies/:movieId", (req, res, next) => {

  const id = req.params.movieId;
  Movie.findById(id)
    .populate("cast")
    .then((movieDetail) => res.render("movies/movie-details", { movie: movieDetail }))
    .catch(err => {
      console.log(err)
      next(err);
    });

});



//Delete movie

router.post('/movies/:movieId/delete', (req, res, next) => {
  const { movieId } = req.params;

  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect(`/movies`))
    .catch(error => next(error));

});



//Edit movie

router.get('/movies/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .populate("cast")
    .then(movieToEdit => res.render('movies/edit-movie.hbs', { movie: movieToEdit }))
    .catch(error => next(error));
});



router.post('/movies/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then(updatedMovie => res.redirect(`/movies/${updatedMovie._id}`))
    .catch(error => next(error));

});




module.exports = router;