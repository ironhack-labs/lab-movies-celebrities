// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .then((celebFromDb) => {

            const celebrities = {
                celebArray: celebFromDb
            }

            res.render('movies/new-movie', celebrities)
        })
        .catch(err => (err))


})
router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movies
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(() => {
            res.render('movies/new-movie')
        })
})
router.get('/movies', (req, res) => {
    console.log('holaaa')
    Movies
        .find()
        .populate('cast')
        .then((moviesFromDb) => {

            const movies = {
                moviesArray: moviesFromDb
            }
            // console.log(movies)
            res.render("movies/movies", movies)
        })
        .catch(err => (err))
})
router.get('/movies/movie-details/:movies_id', (req, res) => {

    const { movies_id } = req.params

    Movies
        .findById(movies_id)
        .populate('cast')
        .then(moviesFromDb => {
            res.render('movies/movie-details', moviesFromDb)
        })
        .catch(err => console.log(err))
})

router.get('/movies/:movie_id/update-movie', (req, res) => {

    const { movie_id } = req.params

    Movies
        .findById(movie_id)
        .then(moviesFromDb => {
            Celebrity
                .find()
                .then(celebrities => {


                    res.render('movies/update-movie', { moviesFromDb, celebrities })
                })

        })
        .catch(err => console.log(err))
})



router.post('/movies/:movie_id/update-movie', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params

    Movies
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})
router.post('/movies/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params
    Movies
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
});



module.exports = router;