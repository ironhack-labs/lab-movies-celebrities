// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities', (req, res, next) => {
	Celebrity.find()
		.then((celebritiesFromDB) => {
			res.render('celebrities/celebrities', { celebs: celebritiesFromDB });
		})
		.catch((err) => console.log(err));
});

//the order of req, res, next is important!!!

router.get('/celebrities/create', (req, res, next) => {
	res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body;

	Celebrity.create({ name, occupation, catchPhrase })
		.then((newCeleb) => {
			res.redirect('/celebrities');
		})
		.catch((err) => {
			console.log('Detected error, redirecting');
			res.render('celebrities/new-celebrity');
		});
});

module.exports = router;
