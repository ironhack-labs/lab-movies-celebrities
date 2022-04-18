const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebritie = require('../models/Celebrity.model')

router.get('/create', (req, res) => {
    // res.send("hola")
    Celebritie
        .find()
        .then(celebritie => {
            res.render('movies/new-movie', { celebritie })
        })
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, celebrities } = req.body
    // console.log(req.body)

    Movie
        .create({ title, genre, plot, celebrities })
        .then(() => {
            res.redirect(`/movies`)
        })
        .catch(err => {
            console.log(err)
            // res.render('celebrities/new-celebrity')
        })
})

router.get('/', (req, res) => {
    // res.send("holaa")
    Movie
        .find()
        .then(movie => {
            res.render('movies/movies', { movie })
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    // res.send("holaa")
    const { id } = req.params
    // console.log(id)
    // console.log(req.body)

    Movie
        .findById(id)
        .populate('celebrities')                                     // nombre del campo que contiene el/los ObjectIDs
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {
    // res.send("holaa")
    const { id } = req.params
    // console.log(id)
    // console.log(req.body)

    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    // console.log(id)
    // console.log(req.body)

    Movie
        .findById(id)
        .then(newMovie => {
            Celebritie
                .find()
                .then(newCelebritie => {
                    res.render('movies/edit-movie', { newMovie, newCelebritie })
                })
                .catch(err => console.log(err)
                )
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    // res.send("hola")
    const { id } = req.params
    const { title, genre, plot, celebrities } = req.body
    console.log(id)
    console.log(req.body)

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, celebrities })
        .then(() => {
            res.redirect(`/movies`)
        })
        .catch(err => console.log(err))
})

module.exports = router;