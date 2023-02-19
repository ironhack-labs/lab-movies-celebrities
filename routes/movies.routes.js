// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Movie = require('../models/Movie.model');

// all your routes here

router.get('/movies/create', (req, res, next) => {
	res.render('movies/new-movie');
});

router.post('/movies/create', (req, res, next) => {
	const { title, genre, plot, cast } = req.body;

	Movie.create({ title, genre, plot, cast })
		.then((newMovie) => {
			res.redirect('/movies');
		})
		.catch((err) => {
			console.log('Detected error, redirecting');
			res.render('movies/new-celebrity');
		});
});

module.exports = router;
