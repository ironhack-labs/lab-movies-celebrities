const router = require('express').Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')
router.get('/movies',async(req,res)=>{
    try{
     const movies = await Movie.find()
     res.render('movies/movies',movies)
    }catch(error){
        console.log(error.message)
    }
})
router.get('/movies/:id',async(req,res)=>{
    const { id } = req.params
    try{
     const movie = await Movie.findById(id).populate('cast')
     res.render('movies/movie-details',movie)
    }catch(error){
        console.log(error.message)
     res.redirect('/movies')
    }
})
router.get('/movies/create',async(req,res)=>{
    const celebrities = await Celebrity.find()
    res.render('movies/new-movie',celebrities)
})
router.post('/movies/create',async(req,res)=>{
   const movie = req.body
   const {title,genre,plot,cast} = movie
   !title || !genre || !plot && res.render('movies/new-movie') 
   const foundedMovie = await Movie.findOne(movie)
   foundedMovie && res.render('movies/new-movie') 
   try{
     await Movie.create(movie)
    res.send('oi')
   }catch(error){
     console.log(error)
     res.redirect('movies/new-movie')
   }
})

module.exports = router