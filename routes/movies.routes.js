const router    = require("express").Router();
const chalk     = require('chalk')
const Movie     = require('../models/movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/create', async (req, res)=>{
    try{
        const celebrities = await Celebrity.find()
        res.render('movies/new-movie', {celebrities})
    } catch(err){
        console.log(chalk.bgRed(err))
    }
})
router.get('/', async (req, res)=>{
    try{
        const movies = await Movie.find()
        res.render('movies/movies', {movies})
    } catch(err){
        console.log(chalk.bgRed(err))
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const movie = await Movie.findById(req.params.id).populate('cast')
        res.render('movies/movie-details', movie)
    } catch(err){
        console.log(chalk.bgRed(err))
    }
})
router.get('/:id/edit', async (req, res)=>{
    try{
        const movie = await Movie.findById(req.params.id)
        const celebrity = await Celebrity.find()
        res.render('movies/edit-movie', {movie, celebrity})
    } catch(err){
        console.log(chalk.bgRed(err))
    }
})
router.post('/create', async (req, res)=>{
    try{
        const {title, genre, plot, cast} = req.body

        const createMovie = await Movie.create({title, genre, plot, cast})
        res.redirect('/movies')
    } catch(err){
        console.log(chalk.bgRed(err))
        res.render('movies/new-movie')
    }
})

router.post('/:id/delete', async (req, res)=>{
    try{
        const deleteMovie = await Movie.findByIdAndRemove(req.params.id)
        res.redirect('/movies')
    } catch(err){
        console.log(chalk.bgRed(err))
        res.render(`movies/${req.params.id}`)
    }
})

router.post('/:id', async (req, res)=>{
    try{
        const {title, genre, plot, cast} = req.body
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast})
        console.log(updateMovie)
        res.redirect(`${req.params.id}`)
    } catch(err){
        console.log(chalk.bgRed(err))
    }
})
module.exports = router;