const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
const router = require("express").Router()
const app = require("../app")
const { populate, find, findByIdAndUpdate } = require("../models/Movie.model")



/* GET create movie */

router.get('/movies/create', (req, res) => {
    
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
})

/* POST create movie */

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .findOne({ title })
        
        .then(movie => {

            if (movie) {
                res.render('movies/new-movie', { errorMessage: '* Ya existe' })
                return
            }

            Movie
                .create({ title, genre, plot, cast})
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})


/* GET Movies's list */
router.get('/movies', (req, res) => {

    Movie
        .find()
        .select('title')
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})


/* GET Movies's details */
router.get('/movies/:movie_id', (req, res) => {

    const { movie_id } = req.params
    
    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => res.render('movies/movies-details', movie ))
        .catch(err => console.log(err))

})


/* POST Delete movie */
router.post('/movies/:id/delete', (req, res) => {
    
    const { id } =req.params

    Movie 
        .findByIdAndRemove(id)
        .populate('cast')
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})

/* GET - POST edit movie */

router.get('/movies/:id/edit', (req, res) => {
    
    const { id } = req.params

    Movie 
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/edit-movie', movie))
        .catch(err => console.log(err))

})

router.post('/movies/:id/edit', (req, res) => {
    const {id} = req.params
    const { title, genre, plot, cast} = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast})
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))

})




module.exports = router