const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')


// Iteration 6 Adding new movies 

router.get('/create', (req, res) => {
    res.render('movies/new-movie')
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('movies/movies')
        })
        .catch(err => console.log(err))
})


// Iteration 7 Movie listing 

router.get('/movies', (req, res) => {

    Movie
        .find()
        .select('title')
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})


// Iteration 8 Movie Details

router.get('/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('celebrity')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})


// Iteration 9 Deleting Movies

router.post('/:id/delete', (req, res) => {

    const { id } = req.query

    Movie
        .findByIdAndDelete(is)
        .then(() => {
            res.redirect('movies/movies')
        })
        .catch(err => console.log(err))
})


// Iteration 10 Editing movies 

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(editMovie => {
            Celebrity
                .find()
                .then(celebrity => {
                    res.render('movies/edit-movie', { celebrity, editMovie })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})


router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect(`/movies/movie-details/${id}`)
        })
        .catch(err => console.log(err))
})


module.exports = router