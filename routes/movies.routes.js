// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require('../models/Movie.model');//Movie del modelo
const Celebrity = require("../models/Celebrity.model")

router.get("/movies/create", (req, res, next) => {
    Celebrity
        .find()
        .then((celebrities) => res.render("movies/new-movie", { celebrities }))
        .catch((err) => console.log(err))
})

// all your routes here


//crea la nueva pelicula (create)
//get dentro tiene el endpoint, empieza siempre con /, es la ruta del navegador
//get muestra los datos en pantalla
router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie') //El render incluye la vista que esta en la carpeta de views y su formato siempre es hbs. NO LLEVA / al pricipio
});

//post es para que no aparezca en la url y para datos sensibles
//lo pinta en el body y lo mete en la base de datos en es el caso ahora
router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot } = req.body

    Movies
        .create({ title, genre, plot })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

});

router.get('/movies', (req, res, next) => {
    Movies
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
});

router.get("/movies/:movie_id", (req, res, next) => {
    const { movie_id } = req.params;

    Movies
        .findById(movie_id)
        .populate("cast")
        .then((movies) => {
            res.render("movies/movie-details", movies)
        })
        .catch((err) => console.log(err))

});

router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params
    Movies
        .findById(id)
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))
});

router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot } = req.body

    Movies
        .findByIdAndUpdate(id, { title, genre, plot }, { new: true })
        .then(updatedMovies => res.redirect(`/movies${updatedMovies._id}`))
        .catch(err => console.log(err))

});

router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movies
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router;