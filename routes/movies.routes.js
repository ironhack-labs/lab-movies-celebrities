const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

//create movie
router.get('/create', (req, res) => {
    Celebrity
        .find()
        .select({ id: 1, name: 1 })
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(movies => res.redirect('/movies'))
        .catch(err => res.redirect('/create'))
})

//movie detail
router.get('/', (req, res) => {
    Movie
        .find()
        .populate('cast')
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/:movie_id', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

//delete movie
router.post('/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

//edit movie
router.get('/:movie_id/edit', (req, res) => {
    const { movie_id } = req.params

    Celebrity
        .find()
        .then(celebrities => {
            Movie
                .findById(movie_id)
                .then(movie => {
                    Celebrity
                        .find()
                        .then(celebrities => res.render('movies/edit-movie', { movie, celebrities }))
                })
        })
        .catch(err => console.log(err))
})

router.post('/:movie_id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params
    console.log('movieid', movie_id)
    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .populate('cast')
        .then(movie => {
            console.log('movieid:', movie_id)
            res.redirect(`/movies/${movie_id}`)
        })
        .catch(err => console.log(err))
})

module.exports = router