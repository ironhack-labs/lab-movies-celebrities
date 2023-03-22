const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities', (req, res) => {
	Celebrity.find().then((celebrities) => {
		res.render('celebrities/list', { celebrities });
	});
});

router.get('/celebrities/create', (req, res) => {
	res.render('celebrities/create');
});

router.post('/celebrities/create', (req, res) => {
	const { name, occupation, catchPhrase } = req.body;
	Celebrity.create({ name, occupation, catchPhrase })
		.then(() => res.redirect('/celebrities'))
		.catch((err) => console.log(err));
});

router.get('/celebrities/:celebId', (req, res) => {
	Celebrity.findById(req.params.celebId)
		.then((celebrity) => res.render('celebrities/celebrity', celebrity))
		.catch((err) => console.log(err));
});

router.get('/celebrities/:celebId/edit', (req, res) => {
	Celebrity.findById(req.params.celebId)
		.then((celebrity) => res.render('celebrities/edit', celebrity))
		.catch((err) => console.log(err));
});

router.post('/celebrities/:celebId/edit', (req, res) => {
	const { name, occupation, catchPhrase } = req.body;

	Celebrity.findByIdAndUpdate(req.params.celebId, { name, occupation, catchPhrase }, { new: true })
		.then(() => res.redirect('/celebrities'))
		.catch((err) => console.log(err));
});

module.exports = router;
