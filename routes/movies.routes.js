// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrities = require("../models/Celebrity.model");

// all your routes here


// Crear una movie
router.get("/movies/create", (req, res) => {
    Celebrities
        .find()
        .then(celebrities => res.render("movies/new-movie", { celebrities }))
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .findOne({ title })
        .then(user => {

            if (user) {
                res.render('movies/new-movie', { errorMessage: 'Movie already created' })
                return
            }

            Movie
                .create({ title, genre, plot, cast })
                .then(() => res.redirect('/movies'))
                .catch(err => console.log(err))




        })
        .catch(err => console.log(err))
})

// Mostrar movies
router.get("/movies", (req, res) => {
    Movie
        .find()
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.log(err))

})


router.get("/movies/:id", (req, res) => {

    const movie_id = req.params.id

    Movie
        .findById(movie_id)
        .then(movie => {
            console.log(movie)
            res.render("movies/movie-details", movie)
        })
        .catch(err => console.log(err))

})



module.exports = router;