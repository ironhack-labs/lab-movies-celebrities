const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies', (req, res) => {
	Movie.find()
		.populate('cast')
		.then((movies) => {
			res.render('movies/list', { movies });
		})
		.catch((err) => console.log(err));
});

router.get('/movies/create', (req, res) => {
	Celebrity.find()
		.then((celebs) => res.render('movies/create', { celebs }))
		.catch((err) => console.log(err));
});

router.post('/movies/create', (req, res) => {
	const { title, genre, plot, cast } = req.body;
	Movie.create({ title, genre, plot, cast })
		.then(() => res.redirect('/movies'))
		.catch((err) => console.log(err));
});

router.get('/movies/:movieId', (req, res) => {
	Movie.findById(req.params.movieId)
		.populate('cast')
		.then((movie) => res.render('movies/movie', movie))
		.catch((err) => console.log(err));
});

router.post('/movies/:movieId/delete', (req, res) => {
	Movie.findByIdAndDelete(req.params.movieId)
		.then(() => res.redirect('/movies'))
		.catch((err) => console.log(err));
});

router.get('/movies/:movieId/edit', (req, res) => {
	let movieInfo;
	Movie.findById(req.params.movieId)
		.then((movie) => {
			movieInfo = movie;
			return Celebrity.find();
		})
		.then((celebs) => res.render('movies/edit', { movieInfo, celebs }))
		.catch((err) => console.log(err));
});

router.post('/movies/:movieId/edit', (req, res) => {
	const { title, genre, cast, plot } = req.body;
	Movie.findByIdAndUpdate(req.params.movieId, { title, genre, cast, plot }, { new: true })
		.then(() => {
			res.redirect('/movies');
		})
		.catch((err) => console.log(err));
});

module.exports = router;
