const router = require("express").Router()
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


router.get('/create', (req, res) => {

    Celebrity
        .find()
        .them(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })

        .catch(err => console.log(err))

})

router.post('/create', (req, res) => {

    const { tittle, genre, plot, cast } = req.body

    Movie
        .create({ tittle, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })

        .catch(err => {
            console.log(err)
            res.render('movies/new-movies')
        })
})



router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))

})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-detail', movie)
        })
        .catch(err => console.log(err))
})


router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
                .catch(err => console.log(err))
        })

    router.get('/:id/edit', (req, res) => {
        const { id } = req.params

        Movie
            .findById(id)
            .populate('cast')
            .then(movie => {
                Celebrity
                    .find()
                    .then(celebrities => {
                        res.render('movies/edit-movies', { movies, celebrities })
                    })
            })
    })

    router.post('/:id/edit', (req, res) => {
        const { id } = req.params
        const { title, genre, plot, cast } = req.body

        Movie
            .findByIdAndUpdate(id, { title, genre, plot, cast })
            .then(() => {
                res.redirect(`/movies/${id}`)
            })
            .catch(err => console.log(err))
    })
})

module.exports = router;

