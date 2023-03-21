const router = require('express').Router();
const Movie = require('../models/Movie.model');

router.get('/movies', (req, res) => {
	Movie.find()
		.then((movies) => {
			res.render('movies/list', { movies });
		})
		.catch((err) => console.log(err));
});

router.get('/movies/create', (req, res) => res.render('movies/create'));

router.post('/movies/create', (req, res) => {
	const { Title, Genre, Plot, Cast } = req.body;
	Movie.create({ Title, Genre, Plot, Cast })
		.then(() => res.redirect('/movies'))
		.catch((err) => console.log(err));
});

router.get('/movies/:movieId', (req, res) => {
	Movie.findById(req.params.movieId)
		.then((movie) => res.render('movies/movie', movie))
		.catch((err) => console.log(err));
});

router.post('/movies/:movieId/delete', (req, res) => {
	Movie.findByIdAndDelete(req.params.movieId)
		.then(() => res.redirect('/movies'))
		.catch((err) => console.log(err));
});

router.get('/movies/:movieId/edit', (req, res) => {
	Movie.findById(req.params.movieId)
		.then((movie) => res.render('movies/edit', { movie }))
		.catch((err) => console.log(err));
});

router.post('/movies/:movieId/edit', (req, res) => {
	const { Title, Genre, Cast, Plot } = req.body;
	Movie.findByIdAndUpdate(req.params.movieId, { Title, Genre, Cast, Plot }, { new: true })
		.then(() => {
			res.redirect('/movies');
		})
		.catch((err) => console.log(err));
});

module.exports = router;
