// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model');

// --------- all your routes here

// show list of celebrities

router.get('/celebrities', async (req, res, next) => {
	Celebrity.find()
		.then((celebritiesFromDB) => {
			const data = {
				celebrity: celebritiesFromDB,
			};

			res.render('celebrities/celebrities', data);
		})
		.catch((e) => {
			console.log('error getting list of celebrities from DB', e);
			next(e);
		});
});

// show create page
router.get('/celebrities/create', async (req, res, next) => {
	try {
		res.render('celebrities/new-celebrity');
	} catch (error) {
		res.send(error);
	}
});

// Process form

router.post('/celebrities/create', async (req, res, next) => {
	try {
		await Celebrity.insertMany(req.body);
		res.redirect('/celebrities');
	} catch (error) {
		res.send(error);
		res.redirect('/celebrities/create');
	}
});

module.exports = router;
