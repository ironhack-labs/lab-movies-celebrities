const express = require("express");
const router = express.Router();

const Celebrity = require('./../models/Celebrity.model')
const Movie = require('../models/Movie.model')

//Mostrar todas las movies
router.get("/movies", (req, res) => {

    Movie
        .find()
        .then(allMovies => {
            res.render('movies/movies', { movies: allMovies })
        })
        .catch(err => console.log(err))
});

router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .then(allCelebrities => {
            res.render('movies/new-movie', { celebrities: allCelebrities })
        })
})

//Crear movies
router.post('/movies/create', (req, res) => {
    //este body va a contener lo que voy a crear y son las propiedades del schema del model 
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


//Movies details. Populo el cast para asociarlo a las movies
router.get('/movies/:id', (req, res) => {

    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))

});


//editar movie (render)

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            Celebrity
                .find()
                .then(celebritiesCreated => {
                    res.render('movies/edit-movie', { movie, celebritiesCreated })
                })
        })
        .catch(err => console.log(err))
})

//editar movie (hanler)

router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => { res.redirect(`/movies/${id}`) })
        .catch(err => console.log(err))

})


//delete 

router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => { res.redirect('/movies') })
        .catch(err => console.log(err))
});



module.exports = router;