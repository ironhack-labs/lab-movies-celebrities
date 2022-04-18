const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

// CREATE NEW MOVIES.

router.get('/create', (req, res) => {

    Celebrity

        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log(err))

})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie

        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err)
            res.render('movies/new-movie')
        })

})

//LIST MOVIES

router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))

})

// DETAILE PAGE 

router.get('/:id', (req, res, next) => {

    const { id } = req.params

    Movie

        .findById(id)
        .populate('cast')
        .then(movie => {
            console.log(movie)
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))

});

//DELETE

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


module.exports = router;

