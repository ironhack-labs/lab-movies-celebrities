
const router = require("express").Router();

const Movie = require('../models/movie.model');

router.get('/', (req, res) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res, next) => {
    res.render('movies/new-movie');
})

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Movie
        .create(req.body)
        .then(() => res.redirect('/movies')) 
        .catch(() => res.render('movies/new-movie',
            { errorMessage: 'It does not work, try again' }))
})

module.exports = router;