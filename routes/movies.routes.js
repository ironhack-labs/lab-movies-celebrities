// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie-model')
const Celebrity = require('../models/Celebrity-model')

// all your routes here




router.get('/movies/create', (req, res) => {


    Celebrity
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log(err))

});


router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movie => {
            res.redirect(`/`)
        })
        .catch(err => console.log(err))

});

router.get('/movies', (req, res) => {

    Movie
        .find()
        .populate('cast')
        .then(movies => {
            console.log(movies)
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))

});


router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => {
            res.render('movies/movie-details', movies)
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => {


            res.render('movies/edit-movie', movies)

        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/edit', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
});






module.exports = router;