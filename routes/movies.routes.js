// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

// PARA MOSTRAR EL FORM PARA CREAR NUEVA PELÍCULA

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((celebrity) => {
        res.render('movies/movie-form', { celebrity })
    })
    .catch((err) => {
        console.error(err)
    })
    
})


// PARA METER NUEVAS PELÍCULAS EN LA BASE DE DATOS

router.post('/movies/create', (req, res, next) => {
    Movie.create(req.body)
    .then((movie) => {
        console.log(`The movie ${movie.title} has been created`)
        res.redirect('/movies')
    })
    .catch((err) => {
        console.error(err);
        res.render('movies/movie-form')
    })
})

// PARA MOSTRAR LAS PELÍCULAS  

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((movie) => {
        res.render('movies/movies', { movie })
    })
    .catch(err => console.error(err))
})

// PARA MOSTRAR DETALLE DE LA PELÍCULA

router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id

    Movie.findById(id) 
    .populate('cast')
    .then((movie) => {
        res.render('movies/movie-details', { movie })
    })
    .catch(err => console.error(err))
})

// ELIMINAR UNA PELÍCULA

router.post('/movies/:id/delete', (req, res, next) => {

    const id = req.params.id

    Movie.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/movies')
    })
    .catch(err => console.error(err))
});

// MOSTRAR PANTALLA DE EDITAR UNA PELÍCULA

router.get('/movies/:id/edit', (req, res, next) => {

    const id = req.params.id
    console.log("entro a la ruta")

    Movie.findById(id)
    .then((movie) => {
        console.log("entra aquí")
        res.render('movies/movie-form', { movie, isEdit: true })
    })
    .catch((err) => {
        console.error(err)
    })
    
});

module.exports = router;