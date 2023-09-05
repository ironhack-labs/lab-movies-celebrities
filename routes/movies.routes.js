const router = require("express").Router();

const Movie = require('../models/Movie.model');

// Create
router.get("/movies/create", (req, res) =>
  res.render("movies/new-movie")
);

router.post("/movies/create", (req, res) => {
    console.log(req.body);
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
    .then(celebrityId => {

        return Movie.findByIdAndUpdate( { $push: { cast: celebrityId._id } })
    })

    .then(() => res.redirect("/movies"))
    .catch((error) => {
      res.redirect("/movies/new-movie");
      next(error);
    });
});

//show all
router.get('/movies', (req, res, next) => {
  Post.find()
    .populate('celebritiesId') 
    .then(allTheMoviesFromDb => {
      
      res.render('movies/movies', { movies: allTheMoviesFromDb });
    })
    .catch(err => {
      console.log(`Err while getting the movies from the DB: ${err}`);
      next(err);
    });
});

//details page
router.get('/movies/:movieId', (req, res, next) => {
  const { movieId } = req.params;
 
  Post.findById(movieId)
    .populate('celebrityId')
    .then(foundMovie => res.render('movies/movie-details', foundMovie))
    .catch(err => {
      console.log(`Err while getting a single movie from the  DB: ${err}`);
      next(err);
    });
});

//delete
router.post('/movies/:movieId/delete', (req, res, next) => {
  const { movieIdId } = req.params;
 
  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect('/movies'))
    .catch(error => next(error));
});

//edit
router.get('/movies/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
 
  Movie.findById(movieId)
    .then(movieToEdit => {
      res.render('movies/edit-movie', {movie: movieToEdit});
    })
    .catch(error => next(error));
});

router.post('/movies/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
  const {  title, genre, plot, cast } = req.body;
 
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`)) 
    .catch(error => next(error));
});

module.exports = router;