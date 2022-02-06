// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { route } = require(".");
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')
// all your routes here

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then((celebrities) => res.render('../views/movies/new-movie', { celebrities }))


})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body








    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')

        })
        .catch(() => res.redirect('/movies/create'))
})

router.get('/', (req, res) => {
    Movie
        .find()

        .then((movies) => res.render('../views/movies/movies', { movies: movies }))
        .catch(() => console.log(err, "there was an error yo!!!"))
})


router.get('/:id', (req, res) => {

    Movie
        .findById(req.params.id)
        .populate('cast')
        .then((movie) => res.render('../views/movies/movie-details', movie))
        .catch((err) => console.log(err, "there was an error yo!!!"))


})

router.post('/:id/delete', (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch((err) => console.log(err))
})

router.get('/:id/edit', (req, res) => {



    Movie
        .findById(req.params.id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebrities => res.render('../views/movies/edit-movie', { movie, celebrities }))
        })



        .catch(err => console.log(err))


})


router.post('/:id/edit', (req, res) => {
    const { title, plot, genre, cast } = req.body

    Movie
        .findByIdAndUpdate(req.params.id, { title, plot, genre, cast })
        .then(() => res.redirect(`/movies/${req.params.id}`))
        .catch(err => console.log(",mistakeeee"))
})






module.exports = router;