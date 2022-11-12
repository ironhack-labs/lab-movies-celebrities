const router = require('express').Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .populate('cast')
        .then(movies => {
            console.log(movies)
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})



router.get('/movies/create', (req, res, next) => {
    Celebrity
        .find()
        .then((celebrities) => {
            const celebrity = { celebrityArr: celebrities }
            res.render('movies/new-movie', celebrity)
        })
        .catch(err => console.log(err))
})




router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movie => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

// ------
router.get('/movies/:id', (req, res, next) => {
    Celebrity
        .find()
        .then((celebrities) => {
            const celebrity = { celebrityArr: celebrities }
            res.render('movies/new-movie', celebrity)
        })
        .catch(err => console.log(err))
})




router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movie => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


module.exports = router