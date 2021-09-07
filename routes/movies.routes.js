// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model');

// all your routes here
router.get('/create', (req, res)=> {
    console.log('create get')
    Celebrity.find()
        .then(allCelebrities => {
            res.render('movies/new-movie', {allCelebrities});
    
        }).catch((error)=> {console.log('upsie, this is not cool!')})
})



router.get('/', (req, res) => {
    Movie.find()
    .then(allMovies => {
        console.log(allMovies)
      res.render('movies/movies', {allMovies})
    }).catch((error)=> {console.log('upsie, this is not cool!')})
});
  
  
  
router.post('/create', (req, res)=> {
    console.log('create post')

    const {title, genre, plot, cast} = req.body
    
    Movie.create({title, genre, plot, cast})
        .then(newMovie => res.redirect('/movies'))
        .catch(error => {
            console.log('movie not created ', error)
            res.render('movies/new-movie')
        })
    
});

router.get('/:id', (req, res) => {
    const {id} = req.params

    Movie.findById(id)
        .populate('cast')
        .then(movie => {
            console.log(movie)
            res.render('movies/movie-details', {movie})
        }).catch((error) => console.log('movie not found', error))
})


module.exports = router;
