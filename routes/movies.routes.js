const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')



// all your routes here

// READ MOVIES
router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .sort({ title: 1 })
        .then(movieFromDB => {
            res.render("movies/movies", { movieFromDB })
        })
        .catch(err => console.log(err))



})
// CREATE MOVIE
router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .select({ name: 1 })
        .then(celebFromDB => {
            res.render("movies/new-movie", { celebFromDB })
        })
        .catch(err => console.log(err))


})
router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(newMovie => res.redirect('/movies'))
        .catch(err => {
            // alert('TRY AGAIN')
            res.redirect('/movies/create')
        })

});

// MOVIE DETAILS
router.get('/movies/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-detail', movie))
        .catch(err => console.log(err))
})

// DELETE MOVIE
router.post('/movies/:id/delete', (req, res, next) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
});

// EDIT MOVIES
router.get('/movies/:id/edit-movie', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => movie)
        .then(movie => {
            Celebrity
                .find()
                .then(celebFromDB => {
                    res.render('movies/edit-movie', { movie, celebFromDB })
                })

        })
        .catch(err => console.log(err))

});

router.post('/movie/:id/edit-movie', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params      // ID para .findByIdAndUpdate()

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect('/movies/edit-movie'))
        .catch(err => console.log(err))

});
module.exports = router;