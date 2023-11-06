// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('./../models/Movie.model')

const Celebrity = require('./../models/Celebrity.model')

// all your routes here
router.get('/', (req, res) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies.hbs', { movies }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('movies/new-movie.hbs', { celebrities })
        })
        .catch(err => console.log(err))




})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))


})

router.get('/details/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => res.render('movies/movie-details.hbs', movies))
        .catch(err => console.log(err))


})

router.get('/delete/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))


})


router.get('/edit/:id', (req, res) => {

    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movies => res.render('movies/edit-movie.hbs', movies))
        .catch(err => console.log(err))


})


router.post('/edit/:id', (req, res) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies/edit-movie'))
        .catch(err => console.log(err))
})



module.exports = router;
