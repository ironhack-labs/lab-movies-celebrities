const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const { route } = require("./celebrities.routes");

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
});

router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details', { movie: movie})
        })
        .catch((e) => console.log(e));
})

router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => Movie.find())
        .then((movies) => {
            res.render('movies/movies', { movies: movies });
        })
        .catch((e) => console.log(e));
})

router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then((movie) => {
            Celebrity.find()
            .then(celebrities => {
                console.log(movie, celebrities)
                res.render('movies/edit-movie', { movie: movie, celebrities: celebrities });
            })
        })
        .catch((e) => console.log(e));
})

router.post('/movies/:id', (req, res, next) => {
    const data = { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(req.params.id, data)
        .then(() => {
            res.redirect(`/movies/${req.params.id}`);
        })
        .catch(() => {
            res.render(`movies/${req.params.id}/edit`);
        })
})

module.exports = router;