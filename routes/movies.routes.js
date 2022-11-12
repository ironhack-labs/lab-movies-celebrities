const router = require("express").Router();

// all your routes here


const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


// List Items
router.get('/movies', (req, res) => {

    Movie
        .find()
        .sort({ title: 1 })
        .populate('cast', 'name')
        .then(moviesArr => {
            res.render('movies/movies', { moviesArr })
        })
        .catch(err => console.log(err))
})

// Item Details
router.get('/movie-details/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .sort({ title: 1 })
        .populate('cast', 'name')
        .then(movieFromDB => {
            // console.log(movieFromDB)
            res.render('movies/movie-details', movieFromDB)
        })
        .catch(err => console.log(err))
})

// Create Item (Render)
router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(celebrityArr => {
            const celebrities = { celebrityArr }
            res.render('movies/new-movie', celebrities)
        })
        .catch(err => console.log(err))
})

// Create Item (Handle)
router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/movies/create')
        })
})


// Edit Item (Render)
router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .sort({ title: 1 })
        .populate('cast', 'name')
        .then(movie => {
            Celebrity
                .find()
                .select({ name: 1 })
                .sort({ name: 1 })
                .then(celebrityArr => {
                    movie.cast.forEach(movieElem => {
                        celebrityArr.forEach(celebrityElem => {
                            if (movieElem.name.includes(celebrityElem.name)) {
                                let elem = celebrityArr.indexOf(celebrityElem)
                                celebrityArr.splice(elem, 1)
                                // console.log(celebrityArr)
                            }
                        })
                    })
                    res.render('movies/edit-movie', { movie, celebrityArr })
                })
        })
        .catch(err => console.log(err))
})

// Edit Item (Handle)
router.post('/movies/:id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { id } = req.params

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .sort({ title: 1 })
        .then(() => res.redirect(`/movie-details/${id}`))
        .catch(err => {
            console.log(err)
            res.redirect(`/movies/${id}/edit`)
        })
})

// Delete Item
router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router;