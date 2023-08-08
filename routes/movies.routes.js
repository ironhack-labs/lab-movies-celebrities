// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model.js')
const Celebrity = require('../models/Celebrity.model.js')

// all your routes here
router.get('/movies/create', async (req,res) =>{
    try {
        let celebrities = await Celebrity.find()
        res.render('movies/new-movie.hbs', {celebrities})
    } catch (error) {
        console.log(error) 
    }
})

router.post('/movies/create', async(req, res) => {
    try {
        const {title, genre, plot, cast} = req.body;
        await Movie.create({title, genre, plot, cast})
        res.redirect('/movies')
    }
    catch(error){
        console.log(error)
        res.redirect('/movies')
    }
} )

router.get('/movies', async (req, res) => {
    try{
        let allMoviesFromDB = await Movie.find()
        res.render('movies/movies.hbs', {movies: allMoviesFromDB})
    }
    catch(error){
        console.log(error)
    }
})

router.get('/movies/:movieId', async (req,res)=>{
    try{
    // ES6 Object Destructuring with bookId route param
    const {movieId} = req.params;

    let foundMovie = await Movie.findById(movieId).populate('cast')
    console.log(foundMovie)



    res.render('movies/movie-details.hbs', foundMovie)

    }
    catch(error){
        console.log(error)
    }
})

router.post('/movies/:movieId/delete', async (req, res) => {
    const {movieId} = req.params;
    try {
        const removedMovie = await Movie.findByIdAndRemove(movieId);

      
        res.redirect('/movies')

    }
    catch(error){

    }
})
router.get('/movies/:movieId/edit', async (req,res) =>{
    try{
    const {movieId} = req.params
    let editMovie = await Movie.findById(movieId)
    
        let celebrities = await Celebrity.find()
        res.render('movies/edit-movie.hbs', {celebrities, editMovie})
    } catch (error) {
        console.log(error) 
    }
})

router.post('/movies/:movieId/edit', async(req, res) => {
    try {
        const {movieId} = req.params
        const {title, genre, plot, cast} = req.body;
        await Movie.findByIdAndUpdate({title, genre, plot, cast})
        res.redirect('/movies')
    }
    catch(error){
        console.log(error)
        res.redirect('/movies')
    }
} )


module.exports = router;