const router = require('express').Router()
const Movies = require('../models/Movies.model')
const Celebrity = require('../models/Celebrity.model')


//listado pelis
router.get('/movies', (req, res) => {
    
    Movies
        .find()
        .then(mov => res.render('movies/movies', {mov}))
        .catch(err => console.log(err))
})
//crear peli
router.get('/movies/create', (req, res) => {
    res.render('movies/new-movie')
    Celebrity
        .find()
        .then(cele => res.render('movies/new-movie', {cele}))
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movies
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies/create'))
        .catch(err => console.log(err))
})


//detalles peli
router.get('/movies/:id', (req, res) => {
    const {id} = req.params
    Movies
        .findById(id)
        .populate('cast')
        .then(movies => res.render('movies/movie-details', movies))
        .catch(err => console.log(err))
})

//borrar pelis
router.post('/movies/:id/delete', (req, res) => {
    const {id} = req.params
    Movies
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})


module.exports = router