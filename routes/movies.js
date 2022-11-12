// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies/create', (req, res) => {
    res.render('movies/new-movie')
})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })

        .then(movies => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/movies', (req, res) => {
    Movie
        .find()
        .then(moviesFromDB => {
            res.render('movies/movies', { movies: moviesFromDB })
        })
        .catch(err => console.log(err))
});

router.get('/movies/:movies_id', (req, res) => {
    const { movies_id } = req.params

    Movie
        .findById(movies_id)
        .then(moviesFromDB => {
            res.render('movies/movie-details', { movies: moviesFromDB })
        })
        .catch(err => console.log(err))
});

router.post('/movies/:movies_id/delete', (req, res) => {
    const { movies_id } = req.params

    Movie
        .findByIdAndDelete(movies_id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
});

router.get('/movies/:movies_id/edit', (req, res) => {
    const { movies_id } = req.params
    Movie
        .findById(movies_id)
        .then(() => {
            res.render('movies/edit-movie')
        })
        .catch(err => console.log(err))
})

router.post('/movies/:movies_id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { movies_id } = req.params
    Movie
        .findByIdAndUpdate(movies_id, { title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})



module.exports = router;

