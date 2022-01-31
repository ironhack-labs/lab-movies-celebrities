const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities: celebrities })
        })
        .catch((e) => console.log(e));
});

router.post('/movies/create', (req, res, next) => {
    Movie.create(req.body)
        .then(() => {
            res.redirect('/movies');
        })
        .catch(() => {
            Celebrity.find()
                .then(celebrities => {
                    res.render('movies/new-movie', { celebrities: celebrities })
                });
        })
});

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(movies => {
            res.render('movies/movies', { movies: movies });
        })
})

module.exports = router;