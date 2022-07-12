const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req,res,next) => {
    Celebrity.find()
    .then( (celebritiesArr) => {
        const data = {
            celebritiesArr: celebritiesArr
        };
        res.render("movies/new-movie", data)
    })
    .catch( (error) => {
        console.log("Error getting movies from DB", error);
        next(error);
      })
    
})

router.post("/movies/create", (req,res,next) => {
   
    const movieDetails = {   
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

  Movie.create(movieDetails)
    .then( () => {
        res.redirect("/movies");
    })
    .catch( (error) => {
        console.log("Error creating a movie in DB", error);
        next(error);
      })
})

router.get("/movies", (req,res,next) => {
    Movie.find()
    .then( (result) => {
        res.render("movies/movies", {result})
    })
    .catch( (error) => {
        console.log("Error listing movies from DB", error);
        next(error);
      })
})

router.get("/movies/:id", (req,res,next) => {
Movie.findById(req.params.id)
.populate("cast")
    .then( (moviesArr) => {
        console.log(moviesArr)
        res.render("movies/movie-details", {moviesArr})
    })
    .catch( (error) => {
        console.log("Error getting details for the movie from DB", error);
        next(error);
      })
})




module.exports = router;