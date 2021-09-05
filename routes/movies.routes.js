// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('./../models/Movie.model');
const Celebrity = require('./../models/Celebrity.model');

router.get('/', (req, res) => {
    Movie
    .find()
    .then(movies => res.render('movies/movies', {movies}))
    .catch(err => console.error(err));
});

router.get('/create', (req, res) => {
    Celebrity
    .find()
    .then(celebrities => {
        res.render('movies/new-movie', {celebrities});
    })
    .catch(err => console.error(err));
});

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie
    .create(req.body)
    .then(() => res.redirect('/movies'))
    .catch((err) => {
        console.error(err);
        res.render('movies/new-movie', {errorMessage: 'No se ha podido crear la película'});
    });
});

router.get('/:movieId', (req, res) => {
    Movie
    .findById(req.params.movieId)
    .populate('cast')
    .then(movie=> res.render('movies/movie-details', movie))
    .catch(err => console.error(err));
});

router.post('/:movieId/delete', (req, res) => {
    Movie
    .findByIdAndRemove(req.params.movieId)
    .then(() => res.redirect('/movies'))
    .catch(err => console.error(err));
});

router.get('/:movieId/edit', (req, res) => {
    let movie, celebrities;

    Movie
    .findById(req.params.movieId)
    .then(result => movie = result)
    .then(() => Celebrity.find())
    .then(result => celebrities = result)
    .then(() => {
        const selCelebs = celebrities.map((cel) => {
            return {cel, selected: movie.cast.includes(cel.id)}
        })
        res.render('movies/edit-movie', {movie, selCelebs});
    }) 
    .catch(err => console.error(err));
});

router.post('/:movieId/edit', (req, res) => {
    Movie
    .findByIdAndUpdate(req.params.movieId, req.body)
    .then(() => res.redirect('/movies/'+req.params.movieId))
    .catch(err => console.error(err));
});

module.exports = router;

