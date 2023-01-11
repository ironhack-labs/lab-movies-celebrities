
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Movie = require("../models/Movie.model");

const Celeb = require('../models/Celeb.model')

const router = require("express").Router();

// all your routes here

router.get('/movies/create', (req, res, next) => {
    Celeb.find()
    .then((allCelebs)=>{
        console.log(allCelebs)
        res.render('movies/new-movie', {allCelebs})
    })
})


router.post('/movies/create', (req, res, next) => {
    console.log(req.body)
    const {title, genre, plot, cast} = req.body
    Movie.create({title:title, genre:genre, plot:plot, cast:cast})
    .then(()=> {
        res.redirect('/movies')
    })
    .catch((err)=> {
        res.render('movies/new-movie')
        console.log('The error while creating is: ', err)
    })
})

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((result) => {
        console.log(result)
        res.render('movies/movies', {result})
    }) 
})

router.get('/movies/:movieId', (req,res,next) =>{
    Movie.findById(req.params.movieId)
    .populate('cast')
    .then((result)=>{
        res.render('movies/movie-details', result)
    })
    .catch((err)=> {
        console.log('The error while rendering movie-details is, ', err)
    })
})

router.post('/movies/:movieId/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.movieId)
    .then(() => {
        res.redirect('/movies')
    })
    .catch((err)=> {
        console.log('The error while deleting the movie-details page is, ', err)
    })
})

router.get('/movies/:movieId/edit', (req, res, next) => {
    
    Movie.findById(req.params.movieId)
    .then((movieToEdit)=>{
        console.log(movieToEdit)
        Celeb.find()
        .then((allCelebs)=>{
            console.log(allCelebs)
            res.render('movies/edit-movie', {allCelebs, movieToEdit})
        })
    })

    // Tried passing multiple variables, did not work
    // function passMultVariables() {
    //     const allCelebs = Celeb.find()
    //     const movieToEdit = Movie.findById(req.params.movieId)
    //     return {cast:allCelebs, movie: movieToEdit}
    // }

    // passMultVariables().then((result)=>{
    //     res.render('movies/edit-movie', result)
    // })
})

router.post('/movies/:movieId/edit', (req, res, next) => {
    console.log(req.body)
    const {title, genre, plot, cast} = req.body
    Movie.findByIdAndUpdate(req.params.movieId, {title:title, genre:genre, plot:plot, cast:cast})
    .then(()=> {
        res.redirect('/movies')
    })
    .catch((err)=> {
        console.log('The error while editing is: ', err)
    })
})


module.exports = router;