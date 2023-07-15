const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get('/create', (req, res) => {
    Celebrity.find()
    .then(celebs => {
        res.render('movies/new-movie',{celebs})
    })
})

router.post('/create', (req, res) => {
    const {title, genre, plot, cast} = req.body
    Movie.create({title, genre, plot, cast})
    .then(movie => {
        console.log(movie)
        res.redirect('/movies')
    })
})

router.get('/', (req, res) => {
    Movie.find()
    .then(movies => {
        res.render('movies/movies', {movies}) 
    })
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    Movie.findById(req.params.id).populate('cast')
    .then(movie => res.render('movies/movie-details', movie))
    .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(()=> res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
    Movie.findById(req.params.id).populate('cast')
    .then(movie => {
        Celebrity.find()
        .then(celebs => {
            const newObject = [movie, celebs]
            console.log(newObject[1])
            res.render('movies/edit-movie', {newObject})
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    console.log(req.params)
    Movie.findByIdAndUpdate(req.params.id)
    .then(()=> res.redirect('/movies'))
    .catch(err => console.log(err))
})

module.exports = router;