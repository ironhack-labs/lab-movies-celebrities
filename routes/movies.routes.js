// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express');
const router = express.Router();

const Movie = require('./../models/movie.model');

const Celebrity = require('./../models/Celebrity.model')

// const { route } = require("./celebrities.routes");

// *****************

router.get("/", (req, res) => {

    Movie
        .find()
        .populate('cast')
        .then(moviesFromDB => {
            res.render('movies/movies', { movies: moviesFromDB })
            // res.send('hola')
        })
        .catch(err => console.log(err))
});

// *******************

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })

        .catch(err => console.log(err))

})
// ********************
router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create(({ title, genre, plot, cast }))
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
});
// ****************************

// MOVIE DETAILS
router.get('/movie-details/:movies_id', (req, res) => {

    const { movies_id } = req.params

    Movie
        .findById(movies_id)
        .populate('cast')
        .then(moviesFromDB => {
            res.render('movies/movie-details', moviesFromDB)
        })
        .catch(err => console.log(err))

})

// **********************
router.post('/movie-details/:movies_id', (req, res) => {

    const { movies_id } = req.params

    Movie
        .findByIdAndDelete(movies_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

});

// **********************
router.get('/edit-movies/:movies_id', (req, res) => {

    const { movies_id } = req.params

    Movie
        .findById(movies_id)
        .populate('cast')
        .then((moviesFromDB) => {
            Celebrity.find()
                .then((celebrities) => {
                    res.render("movies/edit-movie", { moviesFromDB, celebrities })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

// **********************
router.post('/edit-movies/:movies_id', (req, res) => {

    const { movies_id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(movies_id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

});



// all your routes here
module.exports = router;