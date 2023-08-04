const router = require('express').Router()

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/create', (req, res) => {
	Celebrity.find().then(celebsFromDB => {
		res.render('movies/new-movie', { celebs: celebsFromDB })
	})
})

router.post('/create', (req, res) => {
	const { title, genre, plot, cast } = req.body

	Movie.create({ title, genre, plot, cast })
		.then(res.redirect('/movies/movies'))
		.catch(error => console.log(error))
})

router.get('/movies', (req, res) => {
	Movie.find()
		.populate('cast')
		.then(moviesFromDB => res.render('movies/movies', { movies: moviesFromDB }))
		.catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
	const { id } = req.params

	Movie.findById(id)
		.populate('cast')
		.then(movieFound => res.render('movies/movie-details', movieFound))
		// .then(movieFound => res.send(movieFound))
		.catch(error => console.log(error))
})

router.get('/:id/edit', (req, res, next) => {
	const { id } = req.params
	Movie.findById(id)
		.populate('cast')
		.then(movieFound =>
			Celebrity.find().then(celebsFromDB => {
				//TODO aquí habría que intentar filtrar el array de celebsFromDB para pasarle solo a la vsita las celebridades que NO están incluidas en el cast de la película que le estamos pasando también a la vista, ya que en el formulario de edición aparecen duplicados
				res.render('movies/edit-movie', { celebs: celebsFromDB, movie: movieFound })
			})
		)
})

router.post('/:id/edit', (req, res, next) => {
	const { id } = req.params
	const { title, genre, plot, cast } = req.body

	Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
		.then(res.redirect('/movies/movies'))
		.catch(error => console.log(error))
})

router.post('/:id/delete', (req, res) => {
	const { id } = req.params

	Movie.findByIdAndDelete(id)
		.then(res.redirect('/movies/movies'))
		.catch(error => console.log(error))
})

module.exports = router
