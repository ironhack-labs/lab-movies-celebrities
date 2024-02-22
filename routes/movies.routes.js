// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model')

// all your routes here
router.get('/movies/create', (req, res) => {
    CelebrityModel
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
    //console.log("hola")
    //res.render('movies/new-movie')

})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(Movie => res.redirect(`/`))
        .catch(err => res.render('movies/new-movie'))
})

router.get('/movies', (req, res) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

//iteracion 8

router.get('/movies/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')       // Nombre del campo a popular
        .then(movie =>

            res.render('movies/movie-details', movie)
        )
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})


router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .then((movie) => {
            CelebrityModel
                .find()
                .then((celebrities) => {
                    res.render('movies/edit-movie', { movie, celebrities })
                })
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')

        })
        .catch(err => console.log(err))
})


module.exports = router;