const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => res.render(`movies/new-movie`, { celebrities }))
        .catch(err => console.log(err))
})



router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast, pictureUrl } = req.body

    Movie
        .create({ title, genre, plot, cast, pictureUrl })
        .then(res.redirect(`/movies`))
        .catch(err => console.log(err))
})



router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .sort({ title: 1 })
        .then(movies => res.render(`movies/movies`, { movies }))
        .catch(err => console.log(err))
})


router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})


router.post('/movies/delete/:id', (req, res, next) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/edit/:id', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))
})


router.post('/movies/edit/:id', (req, res, next) => {

    const { id } = req.params
    const { title, genre, plot, cast, pictureUrl } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast, pictureUrl })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})



module.exports = router;