// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

// Renderizado del formulario
router.get('/movies/create', (req, res) => {

    Celebrity
    .find()
    .then(celebrities => res.render('movies/new-movie', {celebrities}))
    .catch(err => console.log(err))

});

// // Creacion de la Movie

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        
        .create({ title, genre, plot, cast })
        .then(movies => res.redirect("/movies"))
        .catch(err => res.redirect("/movies"))
});


// // Listado de Movies
router.get('/movies', (req, res) => {


    Movie
        .find()
        // .populate('cast')
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.log(err))

});

// MOstrar Detalla de las peliculas

router.get('/movies/movies-details/:id', (req, res) => {
    // Iteration #4: Update the drone
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => res.render("movies/movie-details", {movies}))
        .catch(err => console.log(err))

});


// ELiminar pelicula

router.post('/movies/:id/delete', (req, res, next) => {
    // Iteration #5: Delete the drone
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
});



module.exports = router;