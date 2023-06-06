// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here

// show list of movies

router.get('/movies', (req, res, next) => {
	Movie.find()
		.then((moviesFromDB) => {
			console.log(moviesFromDB);
			res.render('movies/movies', { movie: moviesFromDB });
		})
		.catch((e) => {
			console.log('error getting celebrity details from DB', e);
			next(e);
		});
});

// show create page
router.get('/movies/create', async (req, res, next) => {
	try {
		const celebrities = await Celebrity.find();
		console.log(celebrities);
		res.render('movies/new-movie', { celebritiesArray: celebrities });
	} catch (error) {
		res.send(error);
	}
});

// Process form

router.post('/movies/create', async (req, res, next) => {
	try {
		console.log(req.body);
		await Movie.create(req.body);
		res.redirect('/movies');
	} catch (error) {
		res.send(error);
		res.redirect('movies/create');
	}
});

router.get('/movies/:id', (req, res, next) => {
	Movie.findById(req.params.id)
		.populate('cast')
		.then((movie) => {
			console.log(movie);
			res.render('movies/movie-details', { movie });
		})
		.catch((error) => next(error));
});

router.post('/movies/:movieID/delete', (req, res, next) => {
	Movie.findByIdAndRemove(req.params.movieID)
		.then(() => {
			res.redirect('/movies');
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
