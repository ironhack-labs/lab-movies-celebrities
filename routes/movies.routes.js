const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model.js');
const Movie =require('../models/Movie.model.js');

router.get('/movies', async (req, res) =>{
    try {
      let allMoviesFromDB = await Movie.find()
     const celebrities = await  Celebrity.find();

     allMoviesFromDB.forEach(element => {
        element.populate("cast");
     });

      res.render('movies/movies.hbs', {movies: allMoviesFromDB, celebrities})
    } catch (error) {
        console.log(error)
    } 
})


router.get('/movies/create', async (req, res) =>{
    try {
      const celebrities = await  Celebrity.find()
      res.render('movies/new-movie.hbs', {celebrities})
    } catch (error) {
     console.log(error)
    }
})

router.post('/movies/create', async (req, res) =>{
    try {
     const {title, genre, plot, cast} = req.body
     await Movie.create({title, genre, plot, cast})
     res.redirect('/movies')
    } catch (error) {
        console.log(error)
    }
})

router.get('/movies/:movieId', async (req,res) =>{
    try {
     const {movieId} = req.params;
     
     

     let foundMovie = await Movie.findById(movieId).populate('cast')

     res.render('movies/movie-details.hbs', foundMovie)


    } catch (error) {
        console.log(error)
    }
})

router.post('/movies/:movieId/delete', async (req,res) =>{
    try {
        const {movieId} = req.params
        await Movie.findByIdAndDelete(movieId)
        res.redirect('/movies')
    } catch (error) {
        console.log(error)
    }
})

router.get('/movies/:movieId/edit', async(req,res) =>{
    try {
        const {movieId} = req.params
        let foundMovie = await Movie.findById(movieId)
        const celebrities = await Celebrity.find()
        res.render('movies/edit-movie.hbs', {movies: foundMovie, celebrities})
    } catch (error) {
        console.log(error)
    }
})

router.post('/movies/:movieId/edit', async(req, res) =>{
    try {
        const {movieId} = req.params
        const {title, genre, plot, cast} = req.body

    
        await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast}, new true);
        res.redirect(`/movies/${req.params.id}`);
        
        
      }
      catch (error){
        console.log(error)
      }
})


module.exports = router