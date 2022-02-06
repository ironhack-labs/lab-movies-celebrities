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
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

// Edit movies

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(movies => {
            Celebrity
                .find()
                .then(celebrities => {
                    res.render('movies/edit-movie', { celebrities, movies })
                })
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`))
        .catch(err => console.log(err))
})




module.exports = router;