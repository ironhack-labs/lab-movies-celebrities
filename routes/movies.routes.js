const router = require("express").Router();

// all your routes here

const MovieModel = require('../models/Movie.model')
const CelebrityModel = require('../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {
    CelebrityModel.find()
        .then((celebrity) => {
            res.render('movies/new-movie', { celebrity })
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    MovieModel.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/movies', (req, res, next) => {
    MovieModel.find()
        .then((allMovies) => {
            console.log({ allMovies });
            res.render('movies/movies', { allMovies })
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/movies/:id', (req, res, next) => {
    MovieModel.findById(req.params.id)
        .populate("cast")
        .then((movie) => {
            res.render('movies/movie-details', movie)
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/movies/:id/delete', (req, res, next) => {
    // const movieId = req.params.id

    MovieModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect("/movies")
        })
        .catch((err) => {
            next(err)
        })
})

router.get("/movies/:id/edit", (req, res, next) => {
    MovieModel.findById(req.params.id)
        .populate("cast")
        .then((movie) => {
            CelebrityModel.find()
                .then((allCelebrities) => {
                    res.render('movies/edit-movie', { movie, allCelebrities })

                })
        })
        .catch((err) => {
            next(err)
        })
})

router.post("/movies/:idEdit", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    MovieModel.findByIdAndUpdate(req.params.idEdit, { title, genre, plot, cast })
        .then((movie) => res.redirect(`/movies/${movie._id}`))
        .catch((err) => next(err))
})




module.exports = router;