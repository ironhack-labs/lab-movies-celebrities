const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/list', async (req,res,next)=>{
    try {
        const moviesList = await Movie.find().populate('_cast','name')
        res.render('movies/movies', { moviesList })
        //res.json(moviesList)
    } catch (error) {
        next(error)
    }
})


router.get('/create', async (req,res,next)=>{
    try {
        const listCelebrities = await Celebrity.find()
        res.render('movies/new-movie', {listCelebrities})
    } catch (error) {
        next(error)
    }
})

router.post('/create', async (req,res,next)=>{
    try {
        const {movieTitle,movieGenre,moviePlot,CelebritiesIds} = req.body
        await Movie.create({title:movieTitle,genre:movieGenre,plot:moviePlot,_cast:CelebritiesIds})
        res.redirect('list')
    } catch (error) {
        next(error);
    }
})

router.get('/:id/detail', async (req,res,next)=>{
    try {
        const { id } = req.params
        const movie = await Movie.findById(id).populate('_cast','name')
        console.log(movie)
        res.render('movies/movie-details', { movie })
    } catch (error) {
        next(error)
    }
})






module.exports = router;