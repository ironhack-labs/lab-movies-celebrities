// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Movie = require("../models/Movie.model")


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

    Movie // paso 4 iteracion 3
        .create(req.body)
        .then(() => res.redirect('/movies')) // redirigimos al listado de celebridades
        .catch(() => res.render('movies/new-movie',
            { errorMessage: 'no se puede crear pelicula' }))
})

module.exports = router;
