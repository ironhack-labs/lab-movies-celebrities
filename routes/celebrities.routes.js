const router = require('express').Router();
require('../db');

// adding the model
const Celebrity = require('../models/Celebrity.model');
// --------------------------------------------
/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});
// --------------------------------------------
// GET - Celebrities CREATE in celebrities/create
router.get('/celebrities/create', (req, res, next) => {
	res.render('celebrities/new-celebrity');
});
// POST - Celebrities CREATE in celebrities/create
router.post('/celebrities/create', (req, res) => {
	const { name, occupation, catchPhrase } = req.body;

	/*
  If there is an error, render the celebrities/new-celebrity view so the user can try again and
  */
	Celebrity.create({ name, occupation, catchPhrase })
		.then(() => {
			res.redirect('/celebrities');
			console.log('Created a celebrity ');
		})
		.catch((error) => console.log('Error while creating a new celebrity POST ->', error));
});
// --------------------------------------------
// POST - Celebrities - [LIST] show all celebrities after Creating one
router.get('/celebrities', (req, res) => {
	Celebrity.find()
		.then((celebrities) => {
			res.render('./celebrities/celebrities.hbs', { celebrities });
		})
		.catch((err) => console.log('Error while showing all the celebrities GET ->', err));
});
// --------------------------------------------
// DELETE celerities - one
router.post('/celebrities/:id/delete', (req, res, next) => {
	// Iteration #5: Delete the drone
	const { id } = req.params;

	Celebrity.findByIdAndDelete(id)
		.then(() => res.redirect('/celebrities'))
		.catch((error) => console.log('Error while trying to delete the celebrity POST router ->', error));
});
// ------------------------------------------------------
// UPDATE celebrities - GET route to display the form to update a specific celebrity
// ------------------------------------------------------
router.get('/celebrities/:id/edit', (req, res, next) => {
	// Iteration #4: Update the drone
	const { id } = req.params;

	//const movies = Movie.findById(id);
	const celebrities = Celebrity.findById(id);

	Promise.all([ celebrities ])
		.then(([ celebrities ]) => res.render('celebrities/edit-celebrity.hbs', { celebrities }))
		.catch((err) => console.log('Error while trying to show the celebrity info GET router ->', err));
	//res.render('movies/edit-movie.hbs', [ movies, celebrities ])
	//res.send([ movies, celebrities ])
});
// ------------------------------------------------------
// UPDATE movies - POST route to actually make updates on a specific movie
// ------------------------------------------------------
router.post('/celebrities/:id/edit', (req, res) => {
	// Iteration #4: Update the drone
	const { id } = req.params;
	const { name, occupation, catchPhrase } = req.body;

	Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
		// sin id a lo mejor
		.then((celebrity) => res.redirect(`/celebrities/details/${celebrity._id}`))
		.catch((error, celebrity) => {
			console.log('Error while updating a celebrity ->', error);
			res.render('celebrities/edit-celebrity.hbs', celebrity);
		});
});
// ------------------------------------------------------
// SHOW celebrities DETAIL
// ------------------------------------------------------
router.get('/celebrities/details/:id', (req, res) => {
	const { id } = req.params;

	Celebrity.findById(id)
		.then((celebrity) => {
			res.render('./celebrities/celebrity-details', celebrity);
		})
		.catch((err) => console.log('Error while trying to show the movie info GET router ->', err));
});
module.exports = router;
