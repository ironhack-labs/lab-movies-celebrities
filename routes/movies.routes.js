const router = require("express").Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
const { route } = require("express/lib/application")


router.get('/create', (req, res) => {
    Celebrity
    .find()
    .then(celebrities => res.render('movies/new-movie', {celebrities}))
    .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast} = req.body
	Movie
    .create({ title, genre, plot, cast})
	.then(() => res.redirect('/movies'))
	.catch((err) => console.log(err))
})

router.get('/', (req,res) => {
    Movie
    .find()
    .then(moviesFromDB => res.render('movies/movies', {moviesFromDB}))
	.catch((err) => console.log(err))

})

router.get('/:id', (req, res) =>  {
    const {id} = req.params
    Movie
    .findById(id)
    .populate('cast')
    .then(selectedMovie => res.render('movies/movie-details', selectedMovie))
	.catch((err) => console.log(err))

})

router.post('/:id/delete', (req, res) => {
    const {id} = req.params
    Movie
    .findByIdAndDelete(id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log (err))
})

router.get('/:id/edit', (req, res) => {
    const {id} = req.params
    Movie
    .findById(id)
    .populate('cast')
    .then(movieToEdit => res.render('movies/edit-movie', movieToEdit))
    .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    const { title, genre, plot, cast} = req.body
    const {id} = req.params
    Movie
    .findByIdAndUpdate(id, { title, genre, plot, cast}, {new: true})
    .then(() => res.redirect(`/movies/${id}`))
    .catch(err => console.log(err))
    
})

module.exports = router