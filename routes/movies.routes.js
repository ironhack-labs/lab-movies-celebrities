// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Movie = require('../models/Movie.model');

const Celebrity = require('../models/Celebrity.model');

// all your routes here

router.get('/movies/create', (req, res, next) => {
	Celebrity.find().then((allCelebrities) => {
		res.render('movies/new-movie', { allCelebrities: allCelebrities });
	});
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
				Celebrity.find().then((allCelebrities) => {
					res.render('movies/new-movie', { movieMessage: 'Movie already in DB!', allCelebrities: allCelebrities });
				});
			}
		})
		.catch((err) => {
			console.log('Detected error, redirecting');
			res.render('movies/new-movie');
		});
});

router.get('/movies/:id/edit', (req, res, next) => {
	const { id } = req.params;

	Movie.findById(id).then((specificMovie) => {
		Celebrity.find().then((allCastMembers) => {
			res.render('movies/edit-movie', { movieToEdit: specificMovie, castToEdit: allCastMembers });
		});
	});
});

router.post('/movies/:id/edit', (req, res, next) => {
	const { id } = req.params;
	const { title, genre, plot } = req.body;

	Movie.findByIdAndUpdate(id, { title, genre, plot }, { new: true })
		.then((updatedMovie) => {
			console.log(updatedMovie);
			res.redirect(`/movies/${updatedMovie.id}`);
		})
		.catch((err) => console.log('DONKEY', err));
});

router.post('/movies/:id/delete', (req, res, next) => {
	const { id } = req.params;

	Movie.findByIdAndDelete(id)
		.then(() => res.redirect('/movies'))
		.catch((err) => console.log('FLONKEY!', err));
});

router.get('/movies', (req, res, next) => {
	Movie.find().then((moviesFromDB) => {
		res.render('movies/movies', { movies: moviesFromDB });
	});
});

router.get('/movies/:id', (req, res, next) => {
	const { id } = req.params;

	Movie.findById(id)
		.populate('cast')
		.then((foundMovie) => {
			console.log(foundMovie);
			res.render('movies/movie-details', { details: foundMovie });
		})
		.catch((err) => console.log('MONKEY', err));
});

module.exports = router;
