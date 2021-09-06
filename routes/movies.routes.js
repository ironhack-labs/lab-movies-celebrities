// const router = require('express').Router()
const router = require("express").Router();
// const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('movies/movies',);
    // res.send("movies")
    // Movie
    //     .find()
    //     .then((movies) => {
    //         // console.log(movies)
    //         res.render('movies/movies', { movies });
    //     }).catch(err => console.error(err))
});

router.get('/:id', (req, res) => {
    const { id } = req.params

    console.log(req.params)
    Movie
        .findOne({ _id: id })
        .then((movie) => {
            console.log(movie)
            res.render('movies/movie-details', { movie })

        })
        .catch(err => console.error(err))
})

// // create
router.get("/create", (req, res) => {

    res.send('create')
    // Celebrity
    //     .find()
    //     .then((celebrities) => {
    //         res.render('movies/new-movie', { celebrities });
    //     })
    //     .catch((err) => console.error(err))

});

router.post('/create', (req, res) => {
    // const { title, genre, plot, cast } = req.body
    // // console.log(req.body)
    // Movie
    //     .create({ title, genre, plot, cast })
    //     .then((movie) => {
    //         // console.log(movie)
    //         res.redirect('/movies')
    //     })
    //     .catch(err => console.error(err))
})

module.exports = router;
