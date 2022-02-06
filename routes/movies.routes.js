const router = require("express").Router();
const { redirect } = require("express/lib/response");


const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

// Routes:

// Create a movie

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})


// List the Movies

router.get('/', (req, res) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))

})


// Movie details

router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-detail', movie))
        .catch(err => console.log(err))
})

// Delete movies

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('movies/movies'))
        .catch(err => console.log(err))
})

// NO CARGA LA PAGINA, STEP 3 IT 9

module.exports = router;