// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here

// show list of movies

router.get('/movies', (req, res, next) => {
	Movie.find()
		.then((moviesFromDB) => {
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
		res.render('movies/new-movie', { celebritiesArray: celebrities });
	} catch (error) {
		res.send(error);
	}
});

// Process form

router.post('/movies/create', async (req, res, next) => {
	try {
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

// Edit: get
router.get('/movies/:movieID/edit', async (req, res, next) => {
	const { movieID } = req.params;

	try {
		const cast = await Celebrity.find();
		const movieDetail = await Movie.findById(movieID);

		res.render('movies/edit-movie', { movie: movieDetail, cast: cast });
	} catch (err) {
		next(err);
	}
});

//Edit: post

router.post('/movies/:movieID/edit', (req, res, next) => {
	const { movieID } = req.params;
	const { title, genre, plot, cast } = req.body;

	console.log(movieID);
	console.log('title: ', title);
	console.log('genre: ', genre);
	console.log('plot: ', plot);
	console.log('cast: ', cast);

	Movie.findByIdAndUpdate(movieID, { title, genre, plot, cast }, { new: true })
		.populate('cast')
		.then((updatedMovie) => {
			res.redirect(`/movies/${updatedMovie.id}`);
		})

		.catch((err) => {
			next(err);
		});
});

module.exports = router;
