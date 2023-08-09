// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model')
const router = require("express").Router();

router.get('/movies/create', (req,res)=>{
    res.render('movies/new-movie');
    });

    router.post('/movies/create', async(req,res)=>{
        //object distructuring
        try{
        const {title, genre, plot, cast} = req.body;
    
        await Movie.create({title, genre, plot, cast});
        res.redirect('/movies');
        }
        catch(error){
            console.log(error);
        }
     });

     router.get('/movies', async(req,res)=>{
        try{
            // get all celebrities from database via .find() method
            let allMoviesFromDb = await Movie.find();
        
        res.render('movies/movies.hbs', {movies: allMoviesFromDb});
    
        }
        catch(error){
            console.log('Error while getting celebrities', error);
        }
        });

module.exports = router;