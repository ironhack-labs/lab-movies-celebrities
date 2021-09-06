const router = require("express").Router();

const Movie = require("../models/Movie.model.js")
const Celebrity = require("../models/Celebrity.model")


router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    if (title.length === 0 || genre.length === 0 || plot.length === 0 || cast.length === 0) {
        res.render("movies/new-movie")
        return
    }

    Movie
        .create({ title, genre, plot, cast })
        .then(theCelebrity => res.redirect(`/movies`))
        .catch(err => console.log(err))

})

router.get('/', (req, res) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(theMovie => res.render('movies/movie-details', theMovie))
        .catch(err => console.log(err))
})


router.post('/delete', (req, res) => {

    const { id } = req.body
    console.log('quiero eliminar una movie', id)
    Movie
        .findByIdAndRemove(id)
        .then(res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router;