const router = require("express").Router()

//Model
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

//GET ROUTES
router.get('/', (req, res)=>{
    res.render('../views/movies/movies.hbs')
})

router.get('/', async(req, res)=>{
    try{
        const celebrities = await Celebrity.find({})
        res.render('./movies/new-movie', {celebrities})
    }catch(err){
        console.log("Error loading Database: ", err)
    }
})


//POST ROUTES

router.post('/create', async (req, res)=>{
    try{
        const {title, genre, plot, cast} = req.body
        const newMovie = await Movie.create({title, genre, plot, cast})
        req.body.cast.forEach((actor) =>{
            Movie.findByIdAndUpdate(newMovie._id, { $push: {cast:actor._id}})
        })
            res.render('./movies/movies')
    }catch(err){
        console.log('Error: ', err)
        res.render('/movies/new-movie')
    }
})



module.exports = router