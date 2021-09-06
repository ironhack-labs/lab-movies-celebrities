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
		.catch((error) => console.log('Error while creating a new celebrity ->', error));
});
// --------------------------------------------
// POST - Celebrities - [LIST] show all celebrities after Creating one
router.get('/celebrities', (req, res) => {
	Celebrity.find()
		.then((celebrities) => {
			res.render('./celebrities/celebrities.hbs', { celebrities });
		})
		.catch((err) => console.log(err));
});
module.exports = router;
