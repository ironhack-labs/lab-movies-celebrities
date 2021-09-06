const router = require("express").Router();
const CelebrityModel = require('./../models/Celebrity.model')


router.get("/create", (req, res, next) => {
	res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res) => {
	const {
		name,
		occupation,
		catchPhrase
	} = req.body

	if (name.length === 0 || occupation.length === 0 || catchPhrase.length === 0) {

		res.render('celebrities/new-celebrity', {
			error: 'Fill all the fields'
		})
		return
	}

	CelebrityModel
		.create({
			name,
			occupation,
			catchPhrase
		})
		.then(() => {
			res.redirect('/celebrities')
		})
		.catch(err => res.render('celebrities/new-celebrity'))

})

router.get('/', (req, res) => {
	CelebrityModel
		.find()
		.select('name occupation catchPhrase')
		.then((celebrities) => res.render('celebrities/celebrities', {
			celebrities
		}))
		.catch(err => console.log(err))
})

router.get('/celebrity-details/:name/:id', (req, res) => {
	const {
		name,
		id
	} = req.params
	// res.send(req.params)

	// res.render('celebrities/celebrity-details')

	CelebrityModel
		.findById(id)
		.then(theCelebrity => res.render('celebrities/celebrity-details', theCelebrity))
		.catch((err) => console.log(err))
})


router.post('/:id/delete', (req, res) => {

	const {
		id
	} = req.params

	CelebrityModel
		.findByIdAndDelete(id)
		.then(res.redirect('/celebrities'))
		.catch((err) => console.log(err))

})


router.get('/:id/edit', (req, res) => {

	const {
		id
	} = req.params

	CelebrityModel
		.findById(id)
		.then((theCelebrity) => {
			res.render('celebrities/edit-celebrity', theCelebrity)
		})
})

router.post('/:id/edit', (req, res) => {
	const {
		id
	} = req.params
	const {
		name,
		occupation,
		catchPhrase
	} = req.body

	CelebrityModel
		.findByIdAndUpdate(id, {
			name,
			occupation,
			catchPhrase
		})
		.then(res.redirect(`/celebrities/celebrity-details/${name}/${id}`))
		.catch(err => console.log(err))

})

module.exports = router;