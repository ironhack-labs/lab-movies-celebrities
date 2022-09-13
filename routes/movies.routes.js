const app = require('../app')
const { findByIdAndUpdate, updateMany } = require('../models/Celebrity.model')
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

router.get('/movies/:id', (req,res,next) => {
    let movieName = req.params.id
    console.log(`Movie names are:`, movieName)
    Movie.findById(req.params.id)
        .populate('cast')
    .then(movie => {
        console.log(movie)
        res.render('movies/movie-details.hbs', {
            movieArray2: movie
        }) 
    })
    .catch(err => {
        console.log(err)
        res.render('Something went wrong with getting all movies please')
    })
})

router.post('/movies/:id/delete', (req,res,next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(movieDelete => {
        console.log('Data for deleting movie:', movieDelete)
        res.redirect('/movies')
    })
    .catch(err => {
        console.log(err)
        res.send('Ran into error removing movie')
    })
})

router.get('/movies/:id/edit', (req,res,next) => {
    Movie.findById(req.params.id)
        .populate('cast')
    .then(movieEdit => {
        console.log('movie edit data is:', movieEdit)
        Celebrity.find()
    .then(celebEdit => {
        console.log('celeb edit data is:', celebEdit)
    res.render('movies/edit-movie.hbs', {
        movieEditArray: movieEdit,
        celebEditArray: celebEdit
    })
    })    
    })
    
    .catch(err => console.log('Somthing went wrong editing movies:',err))
})

router.post('/movies/:id/edit', (req,res,next) => {
    console.log('checkpoint!', req.body)
    let newMovieTitle = req.body.title
    let newMovieGenre = req.body.genre
    let newMoviePlot = req.body.plot
    Movie.findByIdAndUpdate((req.params.id), {
        title: newMovieTitle,
        genre: newMovieGenre,
        plot: newMoviePlot
    })
    .then(movieUpdate => {
        console.log('new movie update:', movieUpdate)
        res.redirect('/movies')
    })
})

module.exports = router