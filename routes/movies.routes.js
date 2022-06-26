const router = require("express").Router();

const Movie = require('./../models/Movie.model')
//const Celebrity = require('./../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {

    res.render('movies/new-movie')

})


router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(celebrity => res.redirect('/movies'))
        .catch(err => console.log(err))
})


router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then(movies => {
            // console.log(movies)
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))

})

router.get('/movies/:id', (req, res, next) => {

    const { id } = req.params
    //console.log(id)

    Movie
        .findById(id)
        //.populate(cast)
        .then(movies => {

            res.render('movies/movie-details', { movies })
        })
        .catch(err => console.log(err))

})

router.get('/movies/:id/delete', (req, res, next) => {

    const { id } = req.params
    //console.log(id)

    Movie
        .findByIdAndDelete(id)
        .then(movies => {

            res.redirect('/movies')
        })
        .catch(err => console.log(err))

})


router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params


    Movie
        .findById(id)
        .then(movie => {

            res.render('movies/edit-movie', { movie })
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    console.log("buenassss", id)

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})



module.exports = router;
