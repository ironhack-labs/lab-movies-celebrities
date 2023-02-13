// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

require('../db/index')
// all your routes here

router.get('/create', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => {
            console.log({ celebrities })
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log(err))
})

router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie

        .create({ title, genre, plot, cast })
        .then(movies => res.redirect('movies'))
        .catch(err => console.log(err))
})

router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movies => res.render('movies/movie-details', movies))

        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        // .populate('cast')
        .then(movies => {
            Celebrity
                .find()
                .then(celebrities => res.render('movies/edit-movie', { movies, celebrities }))
                .catch(err => console.log(err))
        })
})



// router.get('/:id/edit', (req, res, next) => {

//     const { id } = req.params
//     let promises = [
//         Movie.findById(id),
//         Celebrity.find()
//     ]
//     return Promise.all(promises)
//         .then(promises => { res.render('movies/edit-movie', { movies: promises[0], celebrities: promises[1] }) })
//         .catch(err => console.log(err))

// })

router.post('/movies/:id/edit', (req, res) => {
    const { title, genre, plot, cast, id } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(err => console.log(err))
})

module.exports = router;