const router = require("express").Router();
const { route } = require(".");
const { render } = require("../app");
const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model")

router.get('/movies/create', (req, res) => {

    CelebrityModel
        .find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log(err))

})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    MovieModel
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(error => next(error));

})


router.get('/movies', (req, res) => {

    //res.render('movies/movies', { movies })

    MovieModel
        .find()
        .then((movies) => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})



router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    MovieModel
        .findById(id)
        .populate('cast') // Es el fucking array
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    MovieModel
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params

    MovieModel
        .findById(id)
        .then(movie => {
            CelebrityModel
                .find()
                .then(celebrities => {
                    res.render('movies/edit-movie', { movie, celebrities })
                })
                .catch(err => console.log(err))
        })
})

router.post('/movies/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    MovieModel
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies')) // No redirecciona bien 
        .catch(err => console.log(err))

})


module.exports = router;