const express = require('express');
const router = express.Router();

router.get('/movies/new-movie', (req, res) => {
    Celebrity.find()
      .then(celebrities => {
        res.render('movies/new-movie', { celebrities });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error movies', error);
      });
  });

router.post('/movies/create', (req, res) => {
    const newMovie = req.body;
    Movie.create(newMovie)
    .then(() => {
        res.redirect('/movies');
      })
      .catch((error) => {
        res.status(500).send('Error movies', error);
      });
  });

router.get("/movies/:id", (req,res) => {
    const movieId = res.params.id;
    Movie.findById(movieId)
    .then(response => console.log(response))
    .catch(error => console.log(error))
})

router.post('/movies/:id/delete', (req, res) => {
    const movieId = req.params.id;
      Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect('/movies');})
      .catch(error => {
        res.status(500).send('Error deleting the movie', error);
      });
  });

  module.exports = router;