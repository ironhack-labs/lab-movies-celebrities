const router = require('express').Router()
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .populate('cast')
        .then(movies => {
            // console.log(movies)
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})


//-----
router.get("/movie-details/:movie_id", (req, res) => {
    const { movie_id } = req.params;

    Movie
        .findById(movie_id)
        .populate("cast")
        .then((movie) => {
            res.render("movies/movie-details", movie);
        })
        .catch((err) => console.log(err));
})

//-----
router.post('/movies/:movie_id/delete', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


//-----
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
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
    //res.redirect('/movies/create')
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

//-----




module.exports = router