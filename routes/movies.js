// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies', (req, res) => {
    Movie
        .find()
        .populate('cast')
        .then(moviesFromDB => {
            res.render('movies/movies', { movies: moviesFromDB })
        })
        .catch(err => console.log(err))
})

router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .then((celebritiesFromDB) => {
            res.render('movies/new-movie', { celebritiesFromDB })
        })
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/movies/:movies_id', (req, res) => {
    const { movies_id } = req.params

    Movie
        .findById(movies_id)
        .populate('cast')
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
        /*  .populate('cast') */
        .then(movie => {
            Celebrity
                .find()
                .then((celebrities) => {
                    res.render('movies/edit-movie', { celebrities, movie })
                })
                .catch(err => console.log(err))
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

