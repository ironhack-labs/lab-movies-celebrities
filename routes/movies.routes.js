const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrity => res.render('movies/new-movie', { celebrity }))
})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => {
            console.log(err)
            res.render('movies/new-movie')
        })
})

router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .sort({ title: 1 })
        .then(movie => res.render('movies/movies', { movie }))
        .catch(err => console.log(err))
})

router.get('/movies/details/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

router.post('/movies/delete/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/edit/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebrity => res.render('movies/edit-movie', { movie, celebrity }))
        })
        .catch(err => console.log(err))
})

router.post('/movies/edit', (req, res) => {

    const { title, genre, plot, cast, movie_id } = req.body

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})

module.exports = router;