const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity.model');
const Movies = require('../models/Movies.model');

router.get('/celebrities', (req, res, next) => {
	Celebrity.find()
		.then((dataOfNewCeleb) => {
			res.render('celebrities/celebrities', { celebrity: dataOfNewCeleb });
		})
		.catch((e) => console.log(e));
});

router.get('/celebrities/create', (req, res, next) => {
	res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
	const newCeleb = {
		name: req.body.name,
		occupation: req.body.occupation,
		catchPhrase: req.body.catchPhrase,
	};

	console.log(newCeleb);

	Celebrity.create(newCeleb)
		.then((createNewCeleb) => {
			res.redirect('/celebrities');
		})
		.catch((e) => console.log('something went off', e));
});

module.exports = router;
