// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const express = require('express')


const Movie = require('../models/Movie.model') // Requerimos modelo de Movie como siempre
const Celebrity = require('../models/Celebrity.model')    // Requerimos el modelo de Celebrity para popular


//Ruta GET para mostrar la lista de movies

router.get('/', (req, res) => {

    Movie
        .find()
        .then(movie => res.render('movies/movies', { movie }))
        .catch(err => console.log(err))

})


//Rutas GET y POST para CREATE nueva movie
router.get('/create', (req, res) => {

    Celebrity.find() //Quiero encontrar todas las celebrities
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities }); //Añado lista de celebrities a la view
        })
        .catch(err => console.log(err))

})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movies => res.redirect('/movies'))
        .catch(err => console.log(err))
})

//Ruta para ir a los details
router.get('/details/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast') //populamos el campo que queremos del objeto
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})


// Eliminar movie
router.post('/delete/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})

//GET y POST para editar películas - FALTA CONSEGUIR EDITAR EL CAST QUE ES BONUS
router.get('/:movie_id/edit', (req, res) => {

    const { movie_id } = req.params;

    Movie
        .findById(movie_id)
        .then(movie => res.render("movies/edit-movie", movie))
        .catch(err => console.log(err));
});

router.post('/:movie_id/edit', (req, res) => {

    const { movie_id } = req.params
    const { title, genre, plot, cast } = req.body


    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(movie => res.redirect('/movies'))
        .catch(err => console.log(err))
})


module.exports = router;