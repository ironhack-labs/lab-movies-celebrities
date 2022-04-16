// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("./../models/Movie.model")
const Celebritie = require("./../models/Celebrity.model")


// all your routes here

router.get('/', (req, res) => {

    Movie
        .find()
        .then(movies => {
            res.render('movies/movies.hbs', { movies })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    Celebritie
        .find()
        .then(newCelebritie => res.render('movies/new-movie', { newCelebritie }))
        .catch(() =>
            console.log(err)
        )
})

router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect(`/movies`)

        })
        .catch(() =>
            console.log(err)
        )
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate("cast")
        .then(detMovie => {
            res.render('movies/movie-details', detMovie)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(editMovie => {
            Celebritie
                .find()
                .then(editCeleb => {
                    res.render('movies/edit-movie', { editMovie, editCeleb })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(updateMovie => res.redirect("/movies"))
        .catch(err => console.log(err))
})

module.exports = router;