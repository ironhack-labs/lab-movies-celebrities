const movieRouter = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// GET Route to display form to create movie 
movieRouter.get('/movies/create', (req, res, ) => {
      
    Celebrity.find()
    .then((celebritiesFromDB) =>{
        console.log('Celebs from the DB:');
        res.render('movies/new-movie.hbs',{celeb:celebritiesFromDB});
    })
    .catch( (error) => {
        console.log('Error while getting celebs from the db: ', error);
    });
   
});
//  POST route to process data entered in form
movieRouter.post('/movies/create', (req, res ) => {
    console.log(req.body);
    const {title,genre, plot, cast} = req.body;
    Movie.create(
        { 
         title: title,
         genre: genre,
         plot: plot,
         cast: cast
       }
    )
    .then( (newMovie)=> {
        console.log('New movie: ', newMovie)
        res.redirect('/movies');
    })
    .catch( (error) => {
        console.log('Error while creating movie: ', error);
    });
});
// GET route to show movies created.
movieRouter.get('/movies', (req, res ) => {

    Movie.find()
    .then( (moviesFromDB) => {
        console.log('Movies from the database: ', moviesFromDB);
        res.render('movies/movies.hbs',{moviesFromDB});
    })
    .catch((error) => {
        console.log('Error while getting movies from the database: ', error);
    });
});
// GET route to see movie details 

movieRouter.get('/movies/:id', (req, res)=> {
    console.log(req.params);
    const {id} = req.params;

    Movie.findById(id)
    .populate('cast')
    .then( (movieDetails) =>{
        // console.log('Movie details: ', movieDetails);
        res.render('movies/movie-details.hbs',{movieDetails});
    })
})


// POSt route to delete movie

movieRouter.post('/movies/:id/delete', (req , res ) => {
      console.log(req.params);
      const {id} = req.params;
    Movie.findByIdAndRemove(id)
    .then( ()=> {
        res.redirect('/movies');
    })
    .catch( (error) => {
        console.log('Error while deleting movie: ', error);
    });
});

// GET Route to display form to edit 

movieRouter.get('/movies/:id/edit', (req, res ) =>{
  
   const {id} = req.params;
    Movie.findById(id)
    .then( (movieFromDB) => {
        Celebrity.find()
        .then((allCelebrities) =>{
            allCelebrities.forEach( (oneCelebrity)=>{
               movieFromDB.cast.forEach( (oneCastMember)=> {
                if(oneCelebrity._id.equals(oneCastMember)){
                    oneCelebrity.isInCast = true;
                }
               })
            })
            res.render('movies/edit-movie.hbs', {movie: movieFromDB, allCelebrities });
        })
       
    })
    .catch(( error) => {
        console.log('Error while updating movie: ', error);
    });
})

movieRouter.post('/movie/:id/edit', (req, res ) => {
    console.log(req.params);
    const { id } = req.params;
    const {title, genre, plot, cast} = req.body;

    Movie.findByIdAndUpdate( id, {title, genre, plot, cast}, {new: true})
       .then( (updatedMovie) => {
         console.log('movie updated:')
         res.redirect(`/movies/${updatedMovie._id}`)
       })
       .catch( (error) => {
        console.log('Error while updating movie: ', error);
       });
})

module.exports = movieRouter;