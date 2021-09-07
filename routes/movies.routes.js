const router = require('express').Router();
require('../db');

// Importing model
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// --------------------------------------------
/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});
// --------------------------------------------
// GET - Celebrities CREATE in celebrities/create
// We need to get the name of the celebrity, and pass it to the new-movies.hbs to create the multiple select
router.get('/movies/create', (req, res, next) => {
	Celebrity.find()
		.select('name')
		.then((celebrities) => {
			res.render('./movies/new-movie', { celebrities });
		})
		.catch((err) => console.log('Error while creating a new movie GET router ->', err));
});
// POST - Celebrities CREATE in celebrities/create
router.post('/movies/create', (req, res) => {
	const { title, genre, plot, cast } = req.body;

	/*
  If there is an error, render the celebrities/new-celebrity view so the user can try again and
  */
	Movie.create({ title, genre, plot, cast })
		.then(() => {
			res.redirect('/movies');
			console.log('Created a movie ');
		})
		.catch((error) => console.log('Error while creating a new movie POST router ->', error));
});
// --------------------------------------------
// GET - ALL THE MOVIES [LIST]
router.get('/movies', (req, res) => {
	Movie.find()
		.select('title')
		.then((movies) => {
			res.render('./movies/movies', { movies });
		})
		.catch((err) => console.log('Error while trying to deliver all the movies GET router ->', err));
});
// --------------------------------------------
// MOVIE DETAILS - one movie detail
// populate() the cast
// coger Celebrities?
router.get('/movies/details/:id', (req, res) => {
	const { id } = req.params;

	Movie.findById(id)
		.populate('cast')
		.then((movie) => {
			res.render('./movies/movie-details', movie);
		})
		.catch((err) => console.log('Error while trying to show the movie info GET router ->', err));
});
// --------------------------------------------
// DELETE movies - one
router.post('/movies/:id/delete', (req, res, next) => {
	// Iteration #5: Delete the drone
	const { id } = req.params;

	Movie.findByIdAndDelete(id)
		.then(() => res.redirect('/movies'))
		.catch((error) => console.log('Error while trying to delete the movie POST router ->', error));
});
// --------------------------------------------
module.exports = router;
