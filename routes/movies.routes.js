const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// new movies form (render)
router.get("/movies/create", (req, res, next) => {

    Celebrity
        .find()
        .then(allCelebrities => res.render('movies/new-movie', { allCelebrities }))
        .catch(err => console.log(err));
});

// new movies form (handler)
router.post("/movies/create", (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect("/movies"))
        .catch(err => {
            next(err)
        })

})

router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .then(allMovies => res.render('movies/movies', { allMovies }))
        .catch(err => console.log(err))
})

router.get('/movies/:_id', (req, res, next) => {

    const { _id } = req.params

    Movie
        .findById(_id)
        .populate('cast')
        .then(movieInfo => res.render('movies/movie-details', { movieInfo }))
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/edit-movie', { movie }))
        .catch(err => console.log(err));
})

router.post('/movies/:id', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .populate('cast')
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err));

})
module.exports = router;