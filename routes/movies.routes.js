const router = require("express").Router()
const Movie = require('../models/Movie.model')

router.get('/movies/create', (req, res, next) => {

    res.render('movies/new-movie')
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(() => res.render(`movies/new-movie`))
})
router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then(moviesFromDb => {

            const celebrities = {
                celebrityArray: celebritiesFromDb
            }
            res.render('movies/movies', celebrities)
        })
        .catch(err => console.log(err))
})


module.exports = router