// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
// all your routes here

router.get("/movies", (req, res, next)=>{
    Movie.find()
    .populate("cast")
    .then((moviesFromDB)=>{
        
        const moviesData = {
            moviesArray:moviesFromDB
        }
        console.log(moviesData)
        res.render("movies/movies", moviesData);
    })
    .catch((error)=>{
        console.log("oooops, an error occurs", error)
        next(error)
            });
})

router.get("/movies/:movieId", (req, res, next)=>{
    Movie.findById(req.params.movieId)
    .populate('cast')
    .then((moviesFromDB)=>{

        const moviesData = {
            moviesArray:moviesFromDB
        }
        res.render("movies/movie-details", moviesFromDB)
    })
    .catch((error)=>{
        console.log("oooops, an error did occur showing movie details", error)
        next(error)
            });
});





router.get("/movies/create", (req, res, next)=>{
    Celebrity.find()
    .populate('cast')
    .then((celebrityFromDB) =>{
        const movieData = 
        {celebrityArr: celebrityFromDB}
        // console.log(movieData)
        // res.send("helloooo")
        res.render("movies/new-movie", movieData);
    })
    .catch((error)=>{
console.log("Error getting movies fromDB", error);
next(error)
    });
});

router.post("/movies/create", (req, res, next)=>{
    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
    .then(()=>{
        res.redirect("/movies");
    })
    .catch((error)=>{
        res.render("movies/new-movie")
        next(error)
            });
})





module.exports = router;