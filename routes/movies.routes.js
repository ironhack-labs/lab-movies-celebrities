const express = require('express');
const router = express.Router();

app.get('/movies/new-movie', (req, res) => {
    Celebrity.find()
      .then(celebrities => {
        res.render('movies/new-movie', { celebrities });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error movies', error);
      });
  });

  app.post('/movies/create', (req, res) => {
    const newMovie = req.body;
    Movie.create(newMovie)
    .then(() => {
        res.redirect('/movies');
      })
      .catch((error) => {
        res.status(500).send('Error movies', error);
      });
  });

module.exports = router;
