const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies.model');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movies.model');

router.get('/movies', (req, res, next) => {
	Movies.find()
		.populate('cast')
		.then((dataOfNewMovies) => {
			res.render('movies/movies', { newMovie: dataOfNewMovies });
		});
});

router.get('/movies/create', (req, res, next) => {
	Celebrity.find()

		.then((dataOfNewCeleb) => {
			res.render('movies/new-movie', { celebrity: dataOfNewCeleb });
		})
		.catch((e) => console.log(e));
});

router.post('/movies/create', (req, res, next) => {
	const newMovie = {
		title: req.body.title,
		genre: req.body.genre,
		plot: req.body.plot,
		cast: req.body.cast,
	};

	Movies.create(newMovie)
		.then((createMovie) => {
			res.redirect('/movies');
		})
		.catch((e) => console.log(e));

	// Celebrity.find()
	// 	// .populate('cast')
	// 	.then((dataOfNewCeleb) => {
	// 		res.render('movies/new-movie', { celebrity: dataOfNewCeleb });
	// 	})
	// 	.catch((e) => console.log(e));
});

router.get('movies/:id', (res, req, next) => {
	const id = req.params.id;
	console.log(id);
	Movies.findById(id)
		// .populate('cast')
		.then((detailsOfMovie) => {
			res.render('movies/movie-details', detailsOfMovie);
		})
		.catch((e) => console.log(e));
});

// 647f5ffb5782b614d6ad6e35

module.exports = router;
