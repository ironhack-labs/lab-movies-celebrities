const router = require("express").Router();
const Movies = require("../models/Movies.model");
const Celebs = require("../models/Celebrity.model"); /// ver si corresponde para populate


router.get('/movies', (req, res, next) => {
    Movies
        .find()
        .sort({ title: 1 })
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
});


router.get('/movies/create', (req, res, next) => {

    Celebs
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))

});


router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast, image } = req.body

    Movies
        .create({ title, genre, plot, cast, image })
        .then(newMovie => res.redirect('/movies'))
        .catch(err => console.log(err))
});

router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params

    Movies
        .findById(id)
        .then(movies => {
            Celebs
                .find()
                .sort({ name: 1 })
                .then(celebInfo => res.render('movies/edit-movie', { movies, celebInfo }))
                .catch(err => console.log(err))
        })
})

router.post('/movies/:id/edit', (req, res, next) => {
    const { title, genre, plot, cast, image } = req.body
    const { id } = req.params

    Movies
        .findByIdAndUpdate(id, { title, genre, plot, cast, image })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
});

router.get('/movies/:id/details', (req, res, next) => {
    const { id } = req.params
    Movies
        .findById(id)
        .populate('cast')
        .then(movies => res.render("movies/movie-details", movies))
        .catch(err => console.log(err))

});

router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movies
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
});


module.exports = router;

