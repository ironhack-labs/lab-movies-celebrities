
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")
const router = require("express").Router();


// Get Movies from DB
router.get("/movies", (req, res, next)=> {
    Movie.find()
        .then((moviesArr)=>{
            res.render("movies/movies", {movies: moviesArr})
        })
        .catch(err => {
            console.log("error getting movies from DB", err)
            next(err);
        });
})  

// Get Movie Details
router.get("/movies/:movieId", (req, res, next)=>{
    const id = req.params.movieId;

    Movie.findById(id)
    .populate("cast")
    .then((movieDetails)=>{
        console.log(movieDetails)
        res.render("movies/movie-details", { movie: movieDetails})
    })
    .catch(error => {
        console.log("error getting movie details from DB", error);
        next(error);
    })
})


// Movie Page
// router.get('/movies/:movieId/edit', (req, res, next) => {
//     Movie.create()
//             .then ( () => {
//                 res.render('/movies/new-movie')
//             })
//             .catch (err => {
                
//                 console.log("Error creating movie", err)
//             })
// })

// // Movie POST to DB
// router.post('/celebrities/create', (req, res, next) => {

//         const newCelebritiy = {
//             name: req.body.name,
//             occupation: req.body.occupation,
//             catchPhrase: req.body.catchPhrase,
//         }
        
//         Celebrity.create(newCelebritiy)
//                 .then(celebrityFromDB => {
//                     res.redirect('/celebrities')
//                 })
//                 .catch (err => {
//                     res.render("/celebrities/new-celebrity")
//                     console.log("Error creating new celebrity", err)
//                 })
// })




//Delete Movie
router.post("/movies/:movieId/delete", (req, res, next)=>{
    const id = req.params.movieId;

    Movie.findByIdAndRemove(id)
    .then(()=>{
        res.redirect("/movies")
    })
    .catch(error => {
        console.log("error deleting movie from DB", error);
        next(error);
    })
})

// create route for render the form 
router.get("/movies/create", (req, res, next) => {
    
    Celebrity.find()
    .then(celebrityArr => {
        res.render("movies/new-movie", {celebrity: celebrityArr});
    })
    .catch(err => {
        console.log("error getting a new document in DB", err);
        next(err);
    })
});

// POST route to save new Movies in the DB
router.post('/movies/create', (req, res, next) => {
    // console.log(req.body);
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }
    Movie.create(newMovie)
        .then(response => {
            console.log("New movie stored successfuly", response);
            res.redirect("/movies");
        })
        .catch(err => {
            console.log("error creating a new document in DB", err);
            next(err);
        })
});






module.exports = router;