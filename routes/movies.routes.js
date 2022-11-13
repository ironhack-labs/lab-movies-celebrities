const express = require('express');
const router = express.Router();

const Movies = require('../models/Movies.model')
const Celebrities = require('../models/Celebrity.model')

// ver las pelis

router.get('/movies', (req, res, next) => {

    Movies
        .find()
        .populate('cast')
        .then(moviesFromDB => {
            res.render('movies/movies', { movies: moviesFromDB })
        })

});

//ver detalles

router.get('/movies/:movies_id', (req, res, next) => {

    const { movies_id } = req.params

    Movies
        .findById(movies_id)
        .populate('cast')
        .then(moviesFromDB => {
            res.render('movies/movie-details', { movies: moviesFromDB })
        })
        .catch(err => console.log(err))
})

// crear pelis

router.get('/movies/create', (req, res, next) => {

    Celebrities
        .find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render('movies/new-movie', { celebrities: celebritiesFromDB })
        })
})

router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movies
        .create(req.body)
        .then(movies => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
});

// Delete book 
router.post('/movies/:movies_id/delete', (req, res) => {

    const { movies_id } = req.params

    Movies
        .findByIdAndDelete(movies_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})

// editar pelis


router.get('/movies/:movies_id/edit', (req, res) => {

    const { movies_id } = req.params

    Movies
        .findById(movies_id)
        .then(movies => {
            Celebrities
                .find()
                .then(celebritiesFromDB => {
                    console.log(movies)
                    res.render('movies/edit-movie', { movies, celebritiesFromDB })
                })

        })
        .catch(err => console.log(err))
})


// Edit book form (handle)
router.post('/movies/:movies_id/edit', (req, res) => {

    const { title, genre, plot, cast } = req.body
    const { movies_id } = req.params

    Movies
        .findByIdAndUpdate(movies_id, { title, genre, plot, cast })
        .then(() =>

            res.redirect('/movies')

        )
        .catch(err => console.log(err))
})




module.exports = router;
