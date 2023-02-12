const router = require("express").Router()
const movie = require('./../models/movie.model')
const celebrity = require('./../models/Celebrity.model')



router.get('/create', (req, res) => {

    celebrity
        .find()
        .then(celebrity => res.render('movies/new-movie', { celebrity }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(() => res.redirect('/movies/create'))
})

router.get('/:movie_id', (req, res) => {
    const { movie_id } = req.params

    movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {

    movie
        .find()
        .then(movie => res.render('movies/movies', { movie }))
        .catch(err => console.log(err))
})

router.post('/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params

    movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:movie_id/edit', (req, res) => {

})

module.exports = router;