const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


router.get('/', (req, res, next) => {
    Movie
        .find()
        .then(data => {
            res.render('movies/movies', { data })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res, next) => {

    Celebrity
        .find()
        .select({ name: 1, id: 1 })
        .then(data => {
            res.render('movies/new-movie', { data })
        })
        .catch(err => console.log(err))

});

router.post('/create', (req, res, next) => {

    console.log(req.body)
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err)
            res.render('error')
        })
})

router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params

    Movie
        .findById(id)
        .then(movie => {
            Celebrity
                .find()
                .then(data =>
                    res.render('movies/edit-movie', { movie, data }))
                .catch(err => console.log(err))
        })
})

router.post('/:id/edit', (req, res, next) => {
    const { title, genre, plot, movie_id, cast } = req.body

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)

        })
        .catch(err => console.log(err))
})



module.exports = router;