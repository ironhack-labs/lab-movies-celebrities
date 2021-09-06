const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

// router.get('/movies/create', (req, res) => {
//     res.render('./../views/views-movies/new-movie')
// })
router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .then(theCelebrities => res.render('./views-movies/new-movie', { celebrities: theCelebrities }))
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    if (title.length === 0 || genre.length === 0 || plot.length === 0 || cast.length === 0) {
        res.render('./../views/views-movies/new-movie')
        return
    }
    Movie
        .create({ title, genre, plot, cast })
        .then(res.redirect('/movies'))
        .catch(err => console.log(err))
})



router.get('/movies', (req, res) => {

    Movie
        .find()
        .populate('cast')
        .then(movies => res.render('./../views/views-movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/movies/details/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(theMovie => res.render('./../views/views-movies/movie-details', theMovie))
        .catch(err => console.log(err))

})
router.post('/movies/:movie_id/delete', (req, res) => {

    const { movie_id } = req.params

    console.log('Holaaaaa que pasaaaaaa', movie_id)

    Movie
        .findByIdAndRemove(movie_id)
        .then(res.redirect('/movies'))
        .catch(err => console.log(err))
})

// router.get('/movies/:movie_id/edit', (req, res) => {

//     const { movie_id } = req.params

//     Movie
//         .findById(movie_id)
//         .then(theMovie => )

// })

// router.get('/movies/edit/:movie_id', (req, res) => {

//     Celebrity
//         .find()
//         .then(theCelebrities => res.render('./views-movies/edit-movie', { celebrities: theCelebrities }))
//         .catch(err => console.log(err))
//     Movie
//         .find()
//         .then(theMovie => res.render('./../views/views-movies/edit-movie', theMovie))
//         .catch(err => console.log(err))
// })

// router.post('/movies/edit/:movie_id', (req, res) => {

//     const { movie_id } = req.params

//     const { title, genre, plot, cast } = req.body

//     Movie
//         .findByIdAndUpdate(movie_id, { title, genre, plot, cast }, { new: true })
//         .populate('cast')
//         .then(theMovie => res.redirect('/movies', theMovie))
//         .catch(err => console.log(err))

// })

// router.post('movies/:movie_id', (req, res) => {
//     const { title, genre, plot, cast } = req.body
//     const { movie_id } = req.params


//     Movie
//         .findByIdAndUpdate(movie_id, { title, genre, plot, cast }, { new: true })
//         .then(res.redirent('/movies'))
//         .catch(err => console.log(err))

// })

module.exports = router;