const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


/* GET home page */
router.get('/movies/create', (req, res, next) => {

	Celebrity
		.find()
		.then(celebrities => res.render('movies/new-movie', { celebrities }))
		.catch(err => console.log(err))
});

router.post('/movies/create', (req, res) => {

	const { title, genre, plot, cast } = req.body

	Movie
		.create({ title, genre, plot, cast })
		.then(() => res.redirect('/movies'))
		.catch(err => console.log(err))
})

router.get('/movies', (req, res) => {

	Movie
		.find()
		.then(movies => res.render('movies/movies', { movies }))
		.catch(err => console.log(err))
})

router.get('/movies/:id', (req, res) => {

	const { id } = req.params

	console.log(id)

	Movie
		.findById(id)
		.populate('cast')
		.then(movies => res.render('movies/movie-details', movies))
		.catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res) => {

	const { id } = req.params
	console.log(req.params)
	Movie
		.findByIdAndDelete(id)
		.then(() => res.redirect('/movies'))
		.catch(err => console.log(err))

})


router.get('/movies/:id/edit', (req, res) => {

	const { id } = req.params

	Movie
		.findById(id)
		.then(movie => Celebrity
			.find()
			.then(celebrities => res.render('movies/edit-movie', ({ movie, celebrities })))
			.catch(err => console.log(err))
		)
		.catch(err => console.log(err))

})

router.post('/movies/:id/edit', (req, res) => {

	const { id } = req.params
	const { title, genre, plot, cast } = req.body



	Movie
		.findByIdAndUpdate(id, { title, genre, plot, cast })
		.then(() => res.redirect('/movies'))
		.catch(err => console.log(err))
})


module.exports = router;
