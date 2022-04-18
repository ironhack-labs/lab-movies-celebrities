const router = require("express").Router();
const req = require("express/lib/request");

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model');
// const { find } = require("./../models/Movie.model");


router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .then(NewArrActors => {
            res.render('movies/new-movie', { NewArrActors })
        })


})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body
    // res.send(req.body)

    Movie
        .create({ title, genre, plot, cast })                                   // nombre del campo que contiene el/los ObjectIDs

        .then(newMovie => {
            res.redirect('/movies/create')
        })
        .catch(err => {
            res.render('movies/new-movie')

        })
})


router.get('/movies', (req, res) => {

    Movie
        .find()
        .then(movies => {
            // console.log(movies)
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})


router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')                                     // nombre del campo que contiene el/los ObjectIDs
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

//BORRAR

router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


//RENDERIZAR EL EDITAR

router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            Celebrity.find()
                .then(actors => {
                    res.render('movies/edit-movie', { movie, actors })

                })
        })
        .catch(err => console.log(err))
})

// HACER QUE SE EDITE

    router.post('/movies/:id/edit', (req, res) => {

        const { id } = req.params
        const { title, genre, plot, cast } = req.body

        Movie
            .findByIdAndUpdate(id, { title, genre, plot, cast })
            .then(updateEditedMovie => {
                res.redirect('/movies')
            })
            .catch(err => console.log(err))


})



module.exports = router