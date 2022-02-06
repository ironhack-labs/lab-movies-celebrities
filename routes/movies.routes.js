const router = require("express").Router();

const Movies = require('../models/Movies.model')

const Celebrity = require("../models/Celebrity.model")

router.get("/crear", (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/crear', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movies
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/peliculas'))
        .catch(err => console.log(err))
})


router.get('/', (req, res) => {
    Movies
        .find()
        .then((movies) => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get("/details/:id", (req, res, next) => {
    const { _id } = req.params;

    Movie.findById(_id)
        .populate("Cast")
        .then((movies) => {
            res.render("movies/movie-details", { movies });
        })
        .catch((err) => console.log(err));
});

// router.get('/movies/create', (req, res) => {
//     res.render('movies/new-movie')

// })

// router.post('/movies/create', (req, res) => {
//     const { title, genre, plot, cast } = req.body

//     Movies

//         .create({ title, genre, plot, cast })
//         .then((allmovies) => res.render('movies/new-movie', { allmovies }))
//         .catch(err => console.log(err))


// })

module.exports = router;