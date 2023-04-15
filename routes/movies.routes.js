const router = require("express").Router();

router.get('/movies/edit-movies', (req, res, next) => res.render('edit-movies'));

router.get('/movies/movie-details', (req, res, next) => res.render('movie-details'));

router.get('/movies/movies', (req, res, next) => res.render('movies'));

router.get('/movies/new-movie', (req, res, next) => res.render('new-movie'));

module.exports = router;