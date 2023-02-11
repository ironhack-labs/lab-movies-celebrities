const router = require("express").Router();

const Movie = require('./../models/Movie.model')

const Celebrity = require('./../models/Celebrity.model')

router.get('/movies', (req, res) => {

    const { cast } = req.body
    console.log(cast)
    Movie
        .find()
        .populate('cast')
        .sort({ title: 1 })
        .then(movies => res.render('movies/movies', { movies, cast }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('movies/new-movie')
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movie => res.redirect(`/movies/movies`))
        .catch(err => res.redirect(`/new-movies`))
})

router.get('/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

router.post('/:movie_id/delete', (req, res) => {


    const { movie_id } = req.params



    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies/movies'))
        .catch(err => console.log(err))
})




module.exports = router;