const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

router.get('/movies/create', (req, res, next) => {
    Celebrity
        .find()
        .then(cel => res.render('movies/new-movies', { cel }))
});

router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => {
            console.log(err)
            res.redirect('create')
        });
});

router.get('/movies', (req, res, nex) => {

    Movie
        .find()
        .then(movie => res.render('movies/movies', { movie }))
        .catch(err => console.log(err))
});

router.get('/movies/:movie_id', (req, res) => {
    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
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

router.get('/movies/:movie_id/edit', (req, res) => {

    const { movie_id } = req.params

    Movie

        .findById(movie_id)
        .then((movie) => {

            Celebrity
                .find()
                .then((celebs) => {
                    console.log({ movie, celebs })
                    res.render('movies/edit-movie.hbs', { movie, celebs })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post('/movies/:movie_id/edit', (req, res) => {

    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then( () => res.redirect(`/movies`))
        .catch(err => {
            console.log(err)
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

});

module.exports = router;




