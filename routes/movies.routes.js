// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then(allCelebrities => {
        res.render('movies/new-movie', { allCelebrities })
    })
    .catch(err => next(err))
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie.create({ title, genre, plot, cast })
    .then(newMovie => {
        res.redirect('/movies')
     })
     .catch(err => next(err))
})

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then( allMovies => {
        res.render('movies/movies', { allMovies })
        })
    .catch(err => next(err))    
})

router.get('/movies/:id', (req, res, next) => {
     Movie.findById(req.params.id)
     .populate('cast')
     .then(theMovie => {
        res.render('movies/movie-details', { theMovie })
    })
    .catch(err => next(err))
})

router.post('/movies/:id/delete', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    Movie.findByIdAndDelete(id)
    .then(() => {
       res.redirect('/movies') 
    })
    .catch(err => next(err))
})

router.get('/movies/:id/edit', async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        const celebrities = await Celebrity.find();
        res.render('movies/edit-movie', { movie, celebrities });
      } catch (error) {
        next(error);
      }
})





module.exports = router;