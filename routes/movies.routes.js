// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const MovieModel = require('../models/Movie.model');

// all your routes here

router.get('/create', async(req, res)=>{
const movieToDb = await MovieModel.find();
console.log('trying to redirect to make a movie ')
res.render('movies/new-movie')

});
router.post('/create', async (req, res) => {
    console.log("sending movieform to db")
    try{
        await MovieModel.create(req.body);
        console.log("redirecting to movie list")
        res.redirect('/movies/movies');
    }
    
    catch(err){
        console.log('something went wrong while posting the movie form', err);
    res.redirect('/movies/create');
    }
    });

    router
    .route('/movies')
    .get( (req, res) => {
        MovieModel.find()
        .then(movieList => {
        console.log("trying to render movielist", movieList)
        res.render("movies/movies", {movies: movieList})
    })
    .catch(error =>{
        console.log("could not render movielist", error);
        next(error);
    });
    });

    router.get('/:movieId', (req, res)=>{
        const {movieId} = req.params;

        console.log('the movie id is ', movieId);
        
        MovieModel.findById(movieId)
        .then(theMovie =>  res.render('movies/movie-details', {movie:theMovie}))
       .catch(error => {
           console.log( 'error while rendering movie details', error)
       });
       
    });

    router.post('/:movieId/delete', (req, res,next)=>{
        const {movieId} = req.params;
        console.log('trying to delete movie')

        MovieModel.findByIdAndDelete(movieId)
        .then(()=> res.redirect('/movies/movies'))
        .catch(error => console.log(`problem deleting movie`, error));
    });
    router.post('/:movieId/edit', (req,res)=>{
        const {movieId} = req.params;
        MovieModel.findById(movieId)
        .then((theMovie)=> res.render ('movies/edit-movie', {movie:theMovie}))
        .catch(error=> {
            console.log('coulden´t load edit page', error)
        })
    })

    router.post('/:movieId', (req,res,next)=>{
        const {movieId} = req.params;
        const {title, genre, plot} = req.body;
        MovieModel.findByIdAndUpdate(movieId, {title, genre, plot}, {new:true})
        .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`)) 
    .catch(error => next(error));


    })
    

module.exports = router;