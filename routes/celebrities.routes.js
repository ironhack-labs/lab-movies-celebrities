const router = require('express').Router()

const Celebrity = require('./../models/Celebrity.model')

router.get('/create', (req, res) => {
	res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
	const { name, occupation, catchPhrase } = req.body
	Celebrity.create({ name, occupation, catchPhrase })
		.then(res.redirect('celebrities'))
		.catch(error => console.log(error))
})

router.get('/celebrities', (req, res) => {
	Celebrity.find()
		.then(celebsFromDB => res.render('celebrities/celebrities', { celebrities: celebsFromDB }))
		.catch(error => console.log(error))
})

router.get('/:id/edit', (req, res, next) => {
	const { id } = req.params
	Celebrity.findById(id).then(celebFound => res.render('celebrities/edit-form', celebFound))
})

router.post('/:id/edit', (req, res, next) => {
	const { id } = req.params
	const { name, occupation, catchPhrase } = req.body

	Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
		.then(res.redirect('/celebrities/celebrities'))
		.catch(error => console.log(error))
})

router.post('/:id/delete', (req, res) => {
	const { id } = req.params

	Celebrity.findByIdAndDelete(id)
		.then(res.redirect('/celebrities/celebrities'))
		.catch(error => console.log(error))
})

module.exports = router
