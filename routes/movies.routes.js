// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

// PARA MOSTRAR EL FORM PARA CREAR NUEVA PELÍCULA

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((celebrity) => {
        res.render('movies/new-movie', { celebrity })
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
        res.render('movies/new-movie')
    })
})


module.exports = router;