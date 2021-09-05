const router = require("express").Router();
const Movie = require('./../models/Movie.model');
const Celebrity = require('./../models/Celebrity.model');

router.get('/create', (req, res) => {
  Celebrity
    .find()
    .then((celebrities) => {
      res.render("movies/new-movie", {celebrities});
    })
    .catch((err) => console.log(err));
});

router.get('/create' , (req, res) => res.render('movies/new-movie'));
router.post('/create', (req, res) => {
  const {title, genre, plot, cast} = req.body;
  Movie
    .create({title, genre, plot, cast})
    .then(() => res.redirect('/movies'))
    .catch(err => res.render('movies/new-movie'))
});

router.get('/', (req, res) => {
    Movie
        .find()
        .select('title genre plot cast')
        .then((movies) => res.render('movies/movies', {movies}))
        .catch(err => console.log(err))
});

router.get("/:movieId", (req, res) => {
  Movie
    .findById(req.params.movieId)
    .populate("cast")
    .then((movie) =>
      res.render('movies/movie-details', movie))
    .catch((err) => console.log(err))
});

router.post('/:movieId/delete', (req, res) => {
  Movie
    .findByIdAndRemove(req.params.movieId)
    .then(() => res.redirect('/movies'))
    .catch((err) => console.log(err));
});

router.get('/:movieId/edit', (req, res) => {
  Movie
    .findById(req.params.movieId)
    .then((movie) => {
      Celebrity.findById(movie.cast).then((cast) => {
        Celebrity
          .find({_id:{$ne: cast._id}})
          .then((celebrities) => {res.render('movies/edit-movie',{movie,cast,celebrities})});
      });
    })
    .catch((err) => console.log(err));
});

router.post('/:movieId', (req, res) => {
  const {title, genre, plot, cast} = req.body;
  Movie
    .findByIdAndUpdate(req.params.movieId,{title, genre, plot, cast},{new:true})
    .then(() => res.redirect(`/movies/${req.params.movieId}`))
    .catch(() => res.redirect('/movies/:movieId/edit'));
});

module.exports = router;

