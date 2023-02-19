// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const movie = require('../models/Movie.model');
const celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res) => {
    celebrity.find()
        .then(celebrities => res.render('movies/new-movie.hbs', { celebrities }))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    movie.create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/new-movie.hbs') )
})

router.get('/', (req, res) => {
    movie.find()
        .populate('cast')
        .then(movies => res.render('movies/movies.hbs', { movies }))
        .catch(() => res.render('movies/movies.hbs'))
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    movie.findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details.hbs', {movie}))
        .catch(() => res.render('movies/movies.hbs'))
})
router.post('/:id/delete', (req, res) => {
    const { id } = req.params;
    movie.findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/movies.hbs'))
})
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    let existedCelebrities = {}
    celebrity.find().then(celebrities => { existedCelebrities = celebrities })
    console.log(existedCelebrities)
    movie.findById(id)
        .populate('cast')
        .then(movie => res.render('movies/edit-movie.hbs', { movie, existedCelebrities }))
        .catch(() => res.render('movies/movies.hbs'))
})
router.post('/:id/edit', (req, res) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    movie.findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/movies.hbs'))

})







module.exports = router;