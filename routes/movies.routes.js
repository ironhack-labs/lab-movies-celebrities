// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// ITERATION 5

const Movie = require('../models/Movie.model');

// ITERATION 5 (END)

// ITERATION 6

router.get('/movies/create', (req, res) =>{
    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie', {celebrities});
        })
        .catch((error) => {
            console.log(error);
            res.redirect('/');
        });
});


router.post('/movies/create', (req, res) =>{

    const {title, genre, plot, cast} = req.body;

    // Create a new movie using the provided data
    const newMovie = new Movie({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    });

    // Save the new movie to the database
    newMovie
        .save()
        .then(
            // Redirect to the celebrities page after successful creation
            res.redirect('/movies')
        )
        .catch(err => {
            // Handle the error and render the new-celebrity view again
            res.render('movies/new-movie', { error: "please, try again to insert a new movie" });
        });
});

// ITERATION 6 (END)




// ITERATION 7

router.get('/movies', (req,res) => {

    Movie.find()
        .then((movies)=>{
            res.render('./movies/movies', {movies});
        })
        .catch(() => console.log("error fetching movies"))
})

// ITERATION 7 (END)

// ITERATION 8

router.get('/movies/:id', (req,res) => {

    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('cast')
        .then((movie)=>{
            //const movieDetails = movie;
            res.render('./movies/movie-details', {movie});
            console.log(movie.cast)
        })
        .catch((error) => {
        console.log("error fetching movies", error);
        res.render('error');
        });
})

// ITERATION 8 (END)



// ITERATION 9 - Delete Movie

router.post('/movies/:id/delete', (req,res) => {

    const movieId = req.params.id;

    Movie.findByIdAndRemove(movieId)
        .then (res.redirect('/movies'))
        .catch((error) => {
        console.log("error deleting movie", error);
        res.render('error');
        });
})

// ITERATION 9 (END)



// ITERATION 10 - Editing Movie

router.get('/movies/:id/edit', (req,res) => {

    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('cast')
        .then ((movie)=> {
            Celebrity.find()
                .then((celebrities) => {
                    res.render('./movies/edit-movie', {movie, celebrities});
                })
                .catch((error) => {
                    console.log("error rendering movie", error);
                    res.render('error');
                });
        })
        .catch ((error) => {
            console.log("error fetching movie", error);
            res.render('error');
        });
});


router.post('/movies/:id', (req,res) => {

    const movieId = req.params.id;
    const {title, genre, plot, cast} = req.body;

    Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast})
        .then (()=> 
            res.redirect(`/movies/${movieId}`))
        .catch((error) => {
        console.log("error editing movie", error);
        res.render('error');
        });
})


// ITERATION 10 (END)



module.exports = router;