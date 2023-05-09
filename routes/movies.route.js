// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');
const Movie = require('../models/Movie.model.js');

// all your routes here

router.get('/movies/create',(req,res)=>{
    async function getAllCelebs (){
        try{
            const findAllCelebs = await Celebrity.find();
            res.render('movies/new-movie.hbs',{findAllCelebs})
        }
        catch(error){console.log(error)}
    } 
    getAllCelebs(); 
})

router.post('/movies/create',(req,res)=>{

    const {title,genre,plot,cast} = req.body;
    async function createNewMovieinDB(){
        try{
            const newMovie = await Movie.create({title,genre,plot,cast});
            //console.log('Created new Movie',newMovie);
            res.redirect('/movies')
        }
        catch(error){
            console.log(error); 
            res.render('movies/new-movie.hbs')}
    }
    createNewMovieinDB();
   
})

router.get('/movies',(req,res)=>{
    async function getAllMovies (){
        try{
            const findAllMovies = await Movie.find();
            res.render('movies/movies.hbs',{findAllMovies})
            
        }
        catch(error){console.log(error)}
    } 
    getAllMovies(); 
})

router.get('/movies/:id', (req,res)=>{
    const movieId = req.params.id
   
    async function getMovieDetails (){
        try{
            
            const movieDetails = await Movie.findById(movieId)
            //console.log(movieDetails)
            res.render('movies/movie-details.hbs', {movieDetails});
        }
        catch(error){console.log(error)}
    
    ;
    }
getMovieDetails();
})

router.post('/movies/:id/delete', (req,res)=>{
    const movieId = req.params.id
    async function deleteMovie (){
        try{
            await Movie.findByIdAndRemove(movieId)
            res.redirect('/movies')
        }
        catch(error){console.log(error)}
    }
    deleteMovie();  
})






router.get('/movies/:id/edit', (req, res) => {
    
    async function getMovieDetails(){
    try {
      const movieId = req.params.id;
      
      const movie = await Movie.findById(movieId);
      const celebrities = await Celebrity.find();
  
      res.render("movies/edit-movie.hbs", {movie,celebrities});
    }
    catch(error){console.log(error);
    }}
    getMovieDetails();
  });

router.post('/movies/:id/edit', (req,res)=>{
    const movieId = req.params.id;
    const {title,genre,plot,cast} = req.body
    async function updateMovie(){
        try{
            await Movie.findByIdAndUpdate(movieId, {title,genre,plot,cast})
            res.redirect('/movies')
        }
        catch(error){
            console.log(error);
            res.redirect('/movies/:id/edit');
        }
    }
    updateMovie();
})


module.exports = router;