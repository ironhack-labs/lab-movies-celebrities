const app = require('../app')
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

const router = require('express').Router()

router.get('/movies-route', (req,res,next) => {
    res.send('movies-route')
})

router.get('/movies/create', (req,res,next) => {
    Celebrity.find()
        .then(celebArray => {
            res.render('movies/new-movie.hbs', { celebArray })
        })
        .catch(err => {
            console.log(err)
            res.send('Something went wrong finding celebrities!')
        })
    
})

router.post('/movies/create', (req,res,next) => {
    // Movie.find()
    //     .populate('cast')
    // .then(data => {
    //     console.log('The data:', )

    const { title, genre, plot, cast } = req.body;

    Movie.create({
        title,
        genre,
        plot,
        cast
    })
    .then(movieData => {
        console.log(req.body)
        res.render('movies/movies.hbs', {
            movieArray: movieData
        })
        })
    .catch(err => {
        console.log(err)
        res.render(`Couldn't find the array for movies`)
    })

 })
router.get('/movies', (req,res,next) => {
    Movie.find()
        .populate('cast')
    .then(movie => {
        console.log(movie)
        res.render('movies/movies.hbs', {
            movieArray: movie
        })
    })
    .catch(err => {
        console.log(err)
        res.render('Something went wrong trying to find all movies')
    })
})

module.exports = router