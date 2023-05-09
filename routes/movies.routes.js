const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js');
const Movie = require('../models/Movie.model.js');


// all your routes here

router.get('/movies/create', (req,res)=>{
    async function castCelebrities(){
        try{
            const casting = await Celebrity.find();
            res.render('movies/new-movie.hbs', {casting});
        }
        catch(error){
            console.log(error);
        }
    }
    castCelebrities();
});

router.post('/movies/create', (req,res)=>{
    console.log(req.body); 
    const {title, genre, plot, cast} = req.body;
 
    async function createMovieInDb(){
     try{
         let createdMovie = await Movie.create({title, genre, plot, cast});
         console.log(`New movie created: ${createdMovie.title} `);
         res.redirect('/movies');
     }
     catch(error){
        res.render('movies/new-movie.hbs');
        console.log(error);
     }
    }
    createMovieInDb();
 });

 router.get('/movies', (req,res)=>{
    async function findAllMoviesFromDb(){
      try{
          let allMoviesFromDb = await Movie.find();
          res.render('movies/movies.hbs', {movies: allMoviesFromDb});
      }
      catch(error){
          console.log(error);
      }
    }
    findAllMoviesFromDb();
  });

module.exports = router;