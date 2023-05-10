// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// Require Movie/Celebrity Model 
const Movie = require('../models/Movie.model.js');
const Celebrity = require('../models/Celebrity.model.js');


// GET: Show a form to create a movie
// GET route to retrieve and display details of a specific Movie
router.get('/movies/:id', (req,res)=>{

    const {id} = req.params; 
 
    async function findMovieFromDb(){
     try{
         // Find all the users
         const celebrity = await Celebrity.find();
 
         // Finding the Movie via Id
         let foundCelebrity = await Celebrity.findById(id);
         await foundCelebrity.populate('new movie')
         await foundCelebrity.populate({
             path:'new movie', 
             populate: {
                title: String, 
                genre: String, 
                plot: String,
                cast: [{
                   type: Schema.Types.ObjectId,
                   ref: 'Celebrity'
                 }],
             }
         });

         res.render('movies.hbs', {book: foundBook, celebrity});
     }
     catch(error){
         console.log(error);
     }
    }
    findMovieFromDb();
})
 
// POST: Send the data from the form to this route to create the movie and save it to the database
router.post('/moview/create/:id', (req,res)=>{
    const {id} = req.params; 

    // req.query --> queries of the form that was submitted via 'GET' method
    // req.body --> 'body' of the form that was submitted via 'POST' method
    const { title, genre, plot, cast }  = req.body;

    async function createMovieinDb(){
        try{
            // Create the Review
            const newMovie = await Movie.create({ title, genre, plot, cast } );

            // Add the movie to the celebrity
            const celebrityUpdate = await Celebrity.findByIdAndUpdate(id, {$push: {movies: newMovie._id}} );

            res.redirect(`/movies/${id}`);
        }
        catch(error){
            console.log(error);
        };
    }

    createMovieinDb();

});



router.post('/movies/create', (req,res)=>{ 

   // destructuring the req.body object
   const { title, genre, plot, cast } = req.body;

   async function createMovieInDb(){
    try{
        // Creating the Movie in Db
        let createdMovie = await Movie.create({ title, genre, plot, cast });
        res.redirect('/movies');
    }
    catch(error){
        console.log(error);
    }
   }
   createMovieInDb();
});



module.exports = router;