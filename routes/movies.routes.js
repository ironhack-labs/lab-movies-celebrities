// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')
// all your routes here
router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .then(allCelebs => {
            res.render('movies/new-movie', { allCelebs })
        })
        .catch(err => console.log(err))

})
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            // res.send(',fjhgf')
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

});
router.get('/movies', (req, res) => {
    Movie
        .find()
        .populate('cast')
        .then((movie) => {
            res.render('movies/movies', { movie })
        })
        .catch(err => console.log(err))

})
router.post('/movies/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})
router.get('/movies/:movie_id/details', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})
router.get('/movies/:movie_id/edit', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebrtityArray => {
                    res.render('movies/edit-movie', { movie, celebrtityArray })
                    console.log({ movie, celebrtityArray })
                })
        })
        .catch(err => console.log(err))
})
router.post('/movies/:movie_id/edit', (req, res) => {

    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})


module.exports = router;

