const router = require("express").Router()

const Celebrity = require('./../models/celebrity.model')
const Movie = require('./../models/movies.model')

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => res.redirect('movies/new-movie'))
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(newMovie => {
            res.redirect(`/movies`)
        })
        .catch(err => res.redirect('movies/new-movie'))
})

router.get('/', (req, res) => {
    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => res.redirect('movies/new-movie'))
})

router.get('/:id', (req, res) => {

    const { id } = req.params
    //console.log(id)
    //const movieId = new ObjectId(id)

    Movie
        .findById(id)
        //res.send("funcionaaaa")
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {

    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect(`/movies`)
        })
        .catch(err => console.log(err))
});

router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(movie => {
            res.render('movies/edit-movie', movie)
        })
        .catch(err => console.log(err))
})

// Celebrity
//     .find()
//     .then(celebrities => {
//         res.render('movies/edit-movie', celebrities)
//     })

router.post('/:id', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(movie => {
            res.redirect(`/movies/${id}`)
        })
        .catch(err => console.log(err))
})

module.exports = router