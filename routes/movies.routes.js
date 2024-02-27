const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


router.get("/movies/create", (req, res, next) => {
     Celebrity.find()
         .then((celeb) => {
            res.render('movies/new-movie', {celeb})
        })
          
         .catch((error) => next(error))
 })
router.post('/movies/create', (req, res, next) => {
    Movie.create(req.body)
        .then(() => res.redirect('/movies'))
        .catch((error) => res.render('/movies/new-movie'))
})

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then((movies) => {
            res.render('movies/movies', {movies}) 
        })
        .catch((error) => next(error))
})

router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .then((movie) => res.render('movies/movie-details', {movie}))
        .catch((error) => next(error))
})

router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch((error) => next(error))
})

router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id, req.body, { runValidators: true })
        .then((movie) => {
            Celebrity.find()
                .then((celeb) => res.render('movies/edit-movie', { movie, celeb }))
        })
        .catch((error) => next(error))
});

router.post('/movies/:id/edit', (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
        .then(() => res.redirect(`/movies/${req.params.id}`))
        .catch((error) => next(error))
})

module.exports = router;

