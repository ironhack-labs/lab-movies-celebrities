// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require('../models/Movies.model.js');
const Celebrities = require('../models/Celebrity.model.js')


// all your routes here
router.get('/movies/create', (req, res, next)=>{
    Celebrities.find()
    .then(eachCelebrity => {
        res.render('movies/new-movie', {eachCelebrity})
    })
    .catch(err => next(err))
})

router.post('/movies/create', (req, res, next)=>{
    const {title, genre, plot, cast} = req.body;

    Movies.create({title, genre, plot, cast})
    .then((movieDetails)=> {
        res.redirect('/movies')
    })
    .catch(err => {
        res.render('movies/new-movie')
        next(err);
    })
})

router.get('/movies', (req, res, next)=>{
    Movies.find()
    .then((allMovies) => res.render('movies/movies.hbs', {movies: allMovies}))
    .catch(err => {
        next(err);
    })
});

router.get('/movies/:id', (req, res, next)=>{
    const {id} = req.params;

    Movies.findById(id)
    .populate('cast')
    .then((details) => {
        res.render('movies/movie-details', {movieDetails: details})
    })
    .catch(err => next(err))
})

router.post('/movies/:movieId/delete', (req, res, next) => {
    const {movieId} = req.params;

    Movies.findByIdAndRemove(movieId)
    .then(() => res.redirect('/movies'))
    .catch(err => next(err))
});

router.get('/movies/:id/edit', (req, res, next)=>{

    const {id} = req.params;

    Movies.findById(id)
    .populate('cast')
    .then((movieInfo)=> {
        res.render('movies/edit-movie', {movieInfo})
    })
    .catch(err => next(err))
})

router.post('/movies/:id/edit', (req, res, next)=>{
    const {title, genre, plot, cast} = req.body;
    const {id} = req.params;

    Movies.findByIdAndUpdate(id, {title, genre, plot, cast})
    .then((movie)=> {
        res.redirect(`/movies/${id}`)}
        )
    .catch(err => next(err))
})

module.exports = router;