//Require the router
const router = require('express').Router()
const mongoose = require('mongoose')


//MODELS
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


//ROUTES
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({})
        res.render('./movies/movies.hbs', { movies })
    }
    catch (err) {
        console.log('Error loading movies view:', err)
    }

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
        await Movie.create({ title, genre, plot, cast })
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

router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(typeof req.params.id)
        const movie = await Movie.findById(req.params.id).populate('cast') //Populate the cast array inside the movie with the full celebrity data
        res.render('./movies/movieDetails.hbs', { movie })
    }
    catch (err) {
        console.log('Error getting movie details:', err)
    }
})

router.post('/:id/delete', async(req, res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id)
        res.redirect('/movies')
    }
    catch(err){
        console.log('Error deleting movie:', err)
    }
})

module.exports = router