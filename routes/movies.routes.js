// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//READ: List all movies
router.get("/movies", (req, res, next) => {
    Movie.find()
    .then( moviesFromDB => {
        res.render("movies/movies", {movies: moviesFromDB})
    })
    .catch(err => {
        console.log("error getting movies from DB", err);
        next(err);
    })
})

//READ Movie details
router.get("/movies/:id", (req, res, next) => {
    const id = req.params.id;

    Movie.findById(id)
    .populate("cast")
    .then( movieDetails => {
        res.render("movies/movie-details", movieDetails);
    })
    .catch( err => {
        console.log("error getting movie details from DB", err);
        next();
    })
})

//CREATE: Add new movie: display form
router.get(`/movies/create`, (req, res, next) => {
    Celebrity.find()
    .then( celebrityFromDb => {
        res.render("movies/new-movie", {celebrityFromDb});
    })
    .catch((err) => {
        console.log("Error getting celebs from DB...", err);
        next(err);
      });
})

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
    
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    //Redirect
    Movie.create(movieDetails)
    .then(movieDetails => {
        res.redirect("/movies");
    })
    .catch((err) => {
        console.log("Error creating movie...", err);
        next(err);
    });
})


router.post("/movies/:id/delete", (req, res, next) => {

    const movieId = req.params.id;

    Movie.findByIdAndDelete(movieId)
    .then( deleteMovie => {
        res.redirect("/movies")
    })       
    .catch((err) => {
        console.log("Error creating movie...", err);
        next(err);
    });
})

router.get(`/movies/:id/edit`, (req, res, next) => {
    const id = req.params.id;
    let celebrityFromDb;
    Celebrity.find()
    .then( listOfCelebDb => {
        celebrityFromDb = listOfCelebDb;
        return Movie.findById(id);
    })    
    .then( movieDetails => {
       res.render(`movies/edit-movie`, {movieDetails, celebrityFromDb});
               
    })
    
    .catch( err => {
        console.log("error getting movie details from DB", err);
        next();
    })
})

// UPDATE
router.post(`/movies/:id/edit`, (req, res, next) => {
    const movieId = req.params.id;

    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    
   Movie.findByIdAndUpdate(movieId, movieDetails)
   .then( movieFromDB => {
        res.redirect("/movies");
   })    
    .catch( err => {
        console.log("error getting movie details from DB", err);
        next();
    })
})






module.exports = router;