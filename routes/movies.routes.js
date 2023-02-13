// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model')

const Celebrity = require('../models/Celebrity.model')

require('../db/index')

// all your routes here
router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('./movies/new-movie', { celebrities }))
        .catch(error => console.log(error))



})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movies => {
            res.redirect('./movies')
        })
        .catch(error => console.log(error))


})

router.get('/movies/movies', (req, res) => {
    // res.send('hola')

    Movie
        .find()
        .then(movies => {
            res.render('./movies/movies', { movies })
        })
        .catch(err => console.log(err))
})

router.get('/movies/movies/:id', (req, res) => {

    // res.send('entro aqui?')
    const { id } = req.params

    console.log(req.params)

    // // res.send('estoy')

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => res.render('./movies/movie-details', movies))
        .catch(error => console.log(error))

})
router.post('/movies/:id/delete', (req, res) => {

    // res.send('entro?')

    const { id } = req.params
    console.log(id)

    Movie

        .findByIdAndDelete(id)
        .then(() => res.redirect('./movies'))
        .catch(error => console.log(error))



})



module.exports = router;