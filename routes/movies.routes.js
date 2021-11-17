//Require the router
const router = require('express').Router()


//MODELS
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

//ROUTES
router.get('/', (req, res) => {
    res.render('./movies/movies.hbs')
})

router.get('/create', async (req, res) => {
    try {
        const celebrities = await Celebrity.find({})
        res.render('./movies/newMovie.hbs', { celebrities })
    }
    catch (err) {
        console.log('Error loading all celebrities in create movie page:', err)
    }
})

router.post('/create', async (req, res) => {
    try {
        const { title, genre, plot, cast } = req.body
        const newMovie = await Movie.create({ title, genre, plot, cast })
        req.body.cast.forEach((actor) => { //Push each actor ID inside the cast array
            Movie.findByIdAndUpdate(newMovie._id, { $push: { cast: actor._id } })
        })
        res.render('/movies/movies.hbs')
    }
    catch (err) {
        console.log('Error creating a new movie:', err)
        res.render('./movies/newMovie.hbs')
    }
})



module.exports = router