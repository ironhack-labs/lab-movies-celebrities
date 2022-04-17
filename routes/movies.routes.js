// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

// all your routes here
router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(newCelebrity => {
            res.render('movies/new-movie', { newCelebrity })
        })
        .catch(err => console.log(err))
})

// CREATE MOVIE
router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


router.get('/', (req, res) => {

    Movie
        .find()
        .then(newMovie => {
            res.render('movies/movies', { newMovie })
        })
        .catch(err => console.log(err))
})

// THE MOVIE DETAILS PAGE
router.get('/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate("cast")
        .then(newMovie => {
            res.render('movies/movie-details', newMovie)
        })
        .catch(err => console.log(err))
})

// DELETE MOVIES
router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


// EDIT MOVIES
router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .then(newMovie => {
            Celebrity
                .find()
                .then(newCelebrity => {
                    res.render('movies/edit-movie', { newCelebrity, newMovie })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

})

// UPDATE MOVIES

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect(`/movies/${id}`)
        })
        .catch(err => console.log(err))
})



module.exports = router;