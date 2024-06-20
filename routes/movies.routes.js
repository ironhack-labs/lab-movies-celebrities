// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


router.get('/', (req, res) => {
    Movie
        .find()
        .then((movies) => {
            res.render('movies/movies.hbs', { movies })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then((celebrities) => {
            res.render('movies/new-movie.hbs', { celebrities })
        })
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then((movie) => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/:_id', (req, res) => {
    const { _id } = req.params
    Movie
        .findById(_id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

router.post('/:_id/delete', (req, res) => {
    const { _id } = req.params
    Movie
        .findByIdAndRemove(_id)
        .then((movie) => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})



router.get('/:_id/edit', (req, res) => {
    const { _id } = req.params
    Movie
        .findById(_id)
        .then((movie) => {
            Celebrity
                .find()
                .then((celebrities) => {
                    res.render('movies/edit-movie', { movie: movie, celebrities: celebrities })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})



router.post('/:_id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { _id } = req.params
    Movie
        .findByIdAndUpdate(_id, { title, genre, plot, cast })
        .then((movie) => {
            res.redirect(`/movies`)
        })
        .catch(err => console.log(err))
})



module.exports = router