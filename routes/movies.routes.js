const router = require('express').Router();

const Movie = require('../models/Movie.model')
const Celebrities = require('../models/Celebrity.model');
const { redirect, get } = require('express/lib/response');

// Create New Movie form (render)
router.get('/create', (req, res) => {
    Celebrities
        .find()
        .then(celebrities => res.render('../views/movies/new-movie', { celebrities }))
        .catch(err => console.error(err))

})
// create new movie form (handle)
router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies/create'))
        .catch(err => {
            res.render('../views/movies/new-movie')
            console.error(err)
        })
})

// movie list
router.get('/', (req, res) => {
    Movie
        .find()
        .select('title')
        .then(movies => res.render('../views/movies/movies', { movies }))
        .catch(err => console.log(err))
})
// movie details (with cast of celebrities populate)
router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        //.then(movieDetails => res.send(movieDetails))
        .then(movieDetails => res.render('../views/movies/movie-details', movieDetails))
        .catch(err => console.log(err))
})


router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(movieToEdit => {
            return Celebrities
                    .find()        
                    .then(allCelebrities => {
                        return {
                            movieToEdit,
                            allCelebrities
                        }
                    })
        })
        // .then(movieAndCelebritiesData => res.send(movieAndCelebritiesData))
        .then(movieAndCelebritiesData => res.render('../views/movies/edit-movie', movieAndCelebritiesData))
        .catch(err => console.log(err))
})

router.post('/:id', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(err => console.log(err))
})



//delete movies
router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})






module.exports = router;