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

	Celebrity.findOne({ name })
		.then((celebFromDB) => {
			if (!celebFromDB) {
				Celebrity.create({ name, occupation, catchPhrase }).then(() => {
					res.redirect('/celebrities');
				});
			} else {
				res.render('celebrities/new-celebrity', { message: 'Celeb already exists!' });
			}
		})

		.catch((err) => {
			console.log('Detected error, redirecting');
			res.render('celebrities/new-celebrity');
		});
});

router.get('/celebrities/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		let foundCelebrity = await Celebrity.findById(id);
		res.render('celebrities/celebrity-details', { celebDetails: foundCelebrity });
	} catch (error) {
		console.log('KRIKEY', error);
		next(error);
	}
});

router.get('/celebrities/:id/edit', async (req, res, next) => {
	const { id } = req.params;

	try {
		let celebToEdit = await Celebrity.findById(id);
		res.render('celebrities/edit-celebrity', { celebToEdit: celebToEdit });
	} catch (error) {
		console.log('MIKEY', error);
		next(error);
	}
});

router.post('/celebrities/:id/edit', async (req, res, next) => {
	const { id } = req.params;
	const { name, occupation, catchPhrase } = req.body;

	try {
		let celebToUpdate = await Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true });

		res.redirect(`/celebrities/${celebToUpdate.id}`);
	} catch (error) {
		console.log('PIKEY', error);
		next(error);
	}
});

router.post('/celebrities/:id/delete', async (req, res, next) => {
	const { id } = req.params;

	try {
		await Celebrity.findByIdAndDelete(id);
		res.redirect('/celebrities');
	} catch (error) {
		console.log('AVADA KEDAVRA', error);
		next(error);
	}
});

module.exports = router;
