//Require the router
const router = require('express').Router()
const mongoose = require('mongoose')


//MODELS
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


//ROUTES
router.get('/', async (req, res) => {
    const movies = await Movie.find({})
    res.render('./movies/movies.hbs', { movies })
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
        // console.log(cast) //Cast is an array of actor IDs saved as String types
        // cast.forEach(async(actor) => { //Push each one inside the cast array
        //     console.log(actor)
        //     await Movie.findByIdAndUpdate(newMovie._id, { $push: { cast: mongoose.Types.ObjectId(actor) } }) //Convert to ObjectId type
        // })
        res.render('./movies/movies.hbs')
    }
    catch (err) {
        console.log('Error creating a new movie:', err)
        res.render('./movies/newMovie.hbs')
    }
})

module.exports = router