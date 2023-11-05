const router = require("express").Router()

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrity => res.render('movies/new-movie', { celebrity }))
        .catch(err => console.log(err))

})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/new-movie'))

})

router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))

})

router.get('/:_id', (req, res) => {

    const { _id } = req.params

    Movie
        .findById(_id)
        .populate('cast')
        .then(movies => res.render('movies/movie-details', movies))
        .catch(err => console.log(err))

})

router.post('/:_id/delete', (req, res) => {

    const { _id } = req.params

    Movie
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})

router.get('/:_id/edit', (req, res) => {

    const { _id } = req.params
    const celebritiesPromise = Celebrity.find()
    const moviePromise = Movie.findById(_id)

    Promise.all([celebritiesPromise, moviePromise])
        .then(([celebrities, movie]) => {
            res.render('movies/edit-movie', { movie, celebrities })
        })
        .catch(err => console.log(err))

})

router.post('/:_id/edit', (req, res) => {

    const { _id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(_id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies/${_id}`))
        .catch(err => console.log(err))

})

module.exports = router