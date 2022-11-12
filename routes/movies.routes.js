const router = require("express").Router();
const Movies = require('./../models/Movies.model')
const Celebrity = require('./../models/Celebrity.model')


router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .then(celebFromDB => {
            res.render('movies/new-movie', { celebFromDB })
        })
        .catch(err => console.log(err))

})



router.post('/movies/create', (req, res, next) => {


    const { title, genre, plot, cast } = req.body

    Movies
        .create({ title, genre, plot, cast })
        .then(movies => {
            res.redirect(`/movies`)
        })
        .catch(err => console.log(err))
})

router.get('/movies', (req, res, next) => {

    Movies
        .find()
        .populate('cast')
        .then(moviesFromDb => {
            console.log(moviesFromDb)
            res.render(`movies/movies`, { movies: moviesFromDb });

        })
        .catch(err => console.log(err))

})

router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movies
        .findById(id)
        .populate('cast')
        .then(moviesId => {
            res.render('movies/movie-details', moviesId)
        })
        .catch(err => console.log(err))
})


router.get('/movies/:id/edit', (req, res) => {

    const { id } = req.params

    Movies
        .findById(id)
        .then(moviesId => {
            res.render('movies/edit-movie', moviesId)
        })


})

router.post('/movies/:id/edit', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movies
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))

});


router.post('/movies/eliminar/:id', (req, res) => {

    const { id } = req.params

    Movies
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})


module.exports = router;