// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Movie = require('../models/Movie.model');

// all your routes here

router.get('/movies', (req, res, next) => {
	Movie.find().then((moviesFromDB) => {
		res.render('movies/movies', { movies: moviesFromDB });
	});
});

router.get('/movies/create', (req, res, next) => {
	res.render('movies/new-movie');
});

router.post('/movies/create', (req, res, next) => {
	const { title, genre, plot, cast } = req.body;

	Movie.findOne({ title })
		.then((celebFromDB) => {
			if (!celebFromDB) {
				Movie.create({ title, genre, plot, cast }).then((newMovie) => {
					res.redirect('/movies');
				});
			} else {
				res.render('movies/new-movie', { movieMessage: 'Movie already in DB!' });
			}
		})
		.catch((err) => {
			console.log('Detected error, redirecting');
			res.render('movies/new-movie');
		});
});

module.exports = router;
